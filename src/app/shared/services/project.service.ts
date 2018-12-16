import { Explorer } from './../../projects/models/manager';
import { FormService } from './form.service';
import { Form, BasicFormData, FileForm } from './../../projects/models/forms';
import { UpdateNextId } from './../../projects/actions/manager.actions';
import { AlertService } from './alert.service';

import { State } from './../../reducers';
import * as get from '../../projects/selectors';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { APIPATH, BASEPATH } from '../../config/apiconfig';
import { ExplorerFile } from '../../projects/models/manager';
import { SaveFileReturn, SaveFileError } from '../models/api.model';
import { Project } from '../../projects/models/project';
import { copy2clipboard } from '../../utils/copyclipboard';


const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json;odata=verbose',
    'accept': 'application/json;odata=verbose',
  })
};

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private storedata$: Observable<ExplorerFile>;
  private storedata: ExplorerFile;

  constructor(  private http: HttpClient,
                private store: Store<State>,
                private msg: AlertService,
                private formsvc: FormService) {
    this.store.pipe(select(get.ExplorerFileData)).subscribe(data => this.storedata = data);
  }

  hasProjectsLoaded(): boolean {
    return (!!this.storedata && !!this.storedata.Projects && this.storedata.Projects.length > 0);
  }

  getFileStructure(): ExplorerFile {
    return this.storedata;
  }

  getProjectList(): Observable<ExplorerFile> {
    return this.http.get<ExplorerFile>('assets/projekte/liste.txt');
    // return this._getProjectsFromFile();
  }

  addProject(name: string): Observable<SaveFileReturn<Project> | SaveFileError<Project>> {

    const newProjectModel: Project = {
      Id: this.storedata.NextProjectId,
      Name: name
    };

    const newProject = {
      ...newProjectModel,
      Forms: []
    };

    this.storedata.Projects.push(newProject);
    this.storedata.NextProjectId++;

    this.store.dispatch(new UpdateNextId({
      NextFormId: this.storedata.NextFormId,
      NextProjectId: this.storedata.NextProjectId
    }));

    const json = JSON.stringify(this.storedata);
    const result = {
      withSharepoint: true,
      return: newProjectModel
    };

    return new Observable((observer) => {

      if (environment.production) {
        this.saveListe(json).subscribe(() =>  observer.next(result), 
        error => {
          this.msg.showMessage('error', 'Das Projekt konnte nicht gespeichert werden.');
          observer.error({
            ...result,
            error: error
          });
        });
        
      } else {
        copy2clipboard(json);
        this.msg.showMessage('info', 'Die Projektstruktur wurde in die Zwischenablage eingefügt.');
        observer.next({
          ...result,
          withSharepoint: false
        });
      }
      observer.complete();
    });
  }
    
  addForm(name: string, projectId: number): Observable<SaveFileReturn<Form> | SaveFileError<Form>> {
    const jetzt = new Date;

    const nFormBase: BasicFormData = {
      Id: this.storedata.NextFormId,
      Name: name,
      DeployedVersions: {
        SystemP: null,
        SystemQ: null,
        SystemT: null
      }
    };

    // Datamodel für Store
    const nFormData: Form = {
      ...nFormBase,
      ProjectId: projectId,
      Versions: [{
          Number: 0,
          CreationDate: jetzt,
          LastEdit: jetzt,
          MinorVersions: [{
              CreationDate: jetzt,
              LastEdit: jetzt,
              Number: 1
            }] 
        }]
    };

    // Filemodel für json
    const nFormFile: FileForm = {
      ...nFormBase,
      MajorVersions: [{
        Number: 1,
        MinorVersions: [{
          Number: 1
        }]
      }]
    };

    // FileModel aus Form noch machen

    this.storedata.Projects.find(project => project.Id === projectId).Forms.push(nFormFile);
    this.storedata.NextFormId++;

    this.store.dispatch(new UpdateNextId({
      NextFormId: this.storedata.NextFormId,
      NextProjectId: this.storedata.NextProjectId
    }));

    const json = JSON.stringify(this.storedata);
    const result: SaveFileReturn<Form> = {
      withSharepoint: true,
      return: nFormData
    };

    return new Observable((observer) => {

      if (environment.production) {
        this.saveListe(json).subscribe(() =>  {
          // Projektstruktur gespeichert, jetzt Formular speichern (Errorhandling?)
          this.formsvc.newForm(nFormBase.Id).subscribe(() => observer.next(result),
          err => {
            this.msg.showMessage('error', 'Die Formulardatei konnte nicht gespeichert werden.');
            observer.error({
              ...result,
              error: err
            });
          });
        }, 
        error => {
          this.msg.showMessage('error', 'Das Projekt konnte nicht gespeichert werden.');
          observer.error({
            ...result,
            error: error
          });
        });
        
      } else {
        copy2clipboard(json);
        this.msg.showMessage('info', 'Die Projektstruktur wurde in die Zwischenablage eingefügt. Formulardatei wurde nicht angelegt.');
        observer.next({
          ...result,
          withSharepoint: false
        });
      }
      observer.complete();
    });
  }

  /**
   * Bezieht die komplette Projektliste und ermittelt - sofern Sharepoint aktiv ist - den Zeitpunkt der letzten Bearbeitung
   
  private _getProjectsFromFile(): Observable<ProjectListReturn> {

    return new Observable((observe) => {

      this.http.get<any>('assets/projekte/liste.txt').subscribe(data => {

        // Returnwert
        const res: ProjectListReturn = data;

        if (!environment.production) {

          try {
            // Lokal kann kein LastEdit/Created Timestamp ermittelt werden
            for (const pr of res.Projects) {
              for (const form of pr.Forms) {
                form.LastEdit = new Date(0);
                form.LastEditBy = '';

                for (const maj of form.MajorVersions) {
                  maj.LastEdit = new Date(0);
                  maj.LastEditBy = '';

                  for (const min of maj.MinorVersions) {
                    min.LastEdit = new Date(0);
                    min.LastEditBy = '';
                  }
                }
              }
            }
            observe.next(res);
          } catch (err) {
            observe.error(err);
          }
          

        } else {
          // Bei Sharepoint-Verbindung (prod) lastedits etc über API einfügen
          this.http.get<any>(APIPATH + '_api/web/GetFolderByServerRelativeUrl(\'' +
          '/sites/546/Interne%20Dokumente/mputest/assets/projekte/forms/\')/Files', httpOptions).subscribe(infoRes => {
            const files = <any[]>infoRes.d.results;

            for (const pr of res.Projects) {
              for (const form of pr.Forms) {
                /*let maxFormEdit 
                for (const maj of form.MajorVersions) {
                  for (const min of maj.MinorVersions) {
                    const index = files.findIndex(file => file.name === 'f.txt');

                    if (index >= 0) {
                      const info = files[index];
                      ver.lastEdit = info.TimeLastModified;
                      ver.created = info.TimeCreated;
                    } else {
                      ver.lastEdit = 0;
                      ver.created = 0;
                    }
                  }
                }
              }

            observe.next(res);
            observe.complete();

          }, err => {
            observe.next(res);

          });
        }

        }, error => {
          observe.error('Konnte liste.txt nicht öffnen.');
        });
    });
      
  }*/

  /**
   * Speichert die liste.json auf Sharepoint
   * @param jsonString Inhalt der Datei
   */
  saveListe(jsonString: string): Observable<any> {

    const options = {
      headers: new HttpHeaders({ 
        'Content-Type': 'text/plain',
        'accept': 'application/json;odata=verbose',
        'X-HTTP-Method': 'PUT',
      })
    };

    return this.http.post<any>(APIPATH + '_api/web/GetFileByServerRelativeUrl(\'' +
                              BASEPATH + 'assets/projekte/liste.txt\')/$value',
                              jsonString, options);
  }

    /**
   * Speichert die formular.json auf Sharepoint
   * @param id ID des Formulars
   * @param jsonString Inhalt der Datei
   */
  saveForm(id: string, jsonString: string): Observable<any> {

    const options = {
      headers: new HttpHeaders({ 
        'Content-Type': 'text/plain',
        'accept': 'application/json;odata=verbose'
      })
    };

    return this.http.post<any>(APIPATH + '_api/web/GetFolderByServerRelativeUrl(\'' +
                              BASEPATH + 'assets/projekte/forms/\')/Files/add(url=\'f' + id + 'v1.txt\',overwrite=true)',
                              jsonString, options);
  }

  
  private errHandler<T> (errText = 'Fehler beim Laden der Daten.', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return throwError(error);
    };
  }

  
}
