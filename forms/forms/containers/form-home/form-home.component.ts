import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Version, ProjektDaten } from './../classes/projekte';
import { Formular } from './../classes/controls';
import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription, Observable } from 'rxjs';

enum VersionModes {
  Save = 2,
  Minor = 1,
  Major = 0
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  private _sub: Subscription;
  form: Formular;
  lastform: Formular;
  error: string;
  projektinfo: ProjektDaten;
  currentMode: string; // info, spezi, preview etc
  spError = false; // Fehlerindikator für Sharepointverbindung
  versionNotes = '';
  showSuccess = false;

  versionMode = VersionModes.Save;
  versionConfig = [
    { icon: 'code-branch', mode: VersionModes.Major, name: 'Major' },
    { icon: 'stream', mode: VersionModes.Minor, name: 'Minor' },
    { icon: 'save', mode: VersionModes.Save, name: 'ohne Versionierung' }
  ];

  constructor(private route: ActivatedRoute, private datasvc: DataService, private modalService: NgbModal) {
    this.lastform = null;
   }

  ngOnInit() {

    
    this.currentMode = this.route.firstChild.snapshot.url[0].path;

    // Laden des Formulars mit der Version
    this._sub = this.route.params.subscribe(params => {

      // Wenn 0, dann neues Formular
      if (params['ivp'] === '0') {
        this.datasvc.makeBlank();
      } else {
        this.datasvc.loadForm(params['ivp'], params['major'], params['minor']);
      }

      
    });

    // Wenn Formular geändert wurde
    this.datasvc.getFormdata().subscribe(
      formular => {
        this.form = formular;
        this.error = '';

        if (this.lastform === null) {
          this.lastform = formular;
        }

        this.datasvc.getProjektInfo().subscribe(
          data => {
            this.projektinfo = data;
          }
        );
      });
    
    // Falls noch kein Auth:
    if (!localStorage.getItem('digest')) {
      /**
     * Sharepoint benötigt zur Authentifikation einen DIGEST-Code, der bei allen POST und PUT Requests gegen die REST-Schnittstelle
     * mitgegeben werden muss über den X-RequestDigest Header.
     */
    }
      
  }

  formChanged(): boolean {
    return !(JSON.stringify(this.form) === JSON.stringify(this.lastform));
  }

  getFormstring() {
    return JSON.stringify(this.form, null, 3);
  }

  /**
   * Öffnet einen Dialog mit einem lokalen Template
   * @param dlgRef Lokale Variable für Template
   */
  openDlg(dlgRef) {
    const hDlg = this.modalService.open(dlgRef);
  }


  saveForm() {
    let result: Observable<any>;


    if (this.versionMode === VersionModes.Save) {
      result = this.datasvc.saveForm();
    } else {
      result = this.datasvc.saveVersion(this.versionNotes);
    } 

    result.subscribe(data => {
      console.log(data);
      if (data && data.result) {
        this.showSuccess = true;
      } else {
        window.alert('Das Formular konnte nicht gespeichert werden.');
      }
    }, error => {
      console.error(error);
      window.alert('Formular konnte nicht gespeichert werden.');
    });
    
  }

}
