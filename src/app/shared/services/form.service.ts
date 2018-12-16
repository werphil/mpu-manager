import { FormLoadInfo, FormFile } from './../../forms/models/form';
import { AlertService } from './alert.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

constructor(private http: HttpClient, private msg: AlertService) { }

  public getFormFile(fileinfo: FormLoadInfo): Observable<FormFile> {
    return this.http.get<FormFile>('assets/projekte/forms/f' + fileinfo.Id + 'v' + fileinfo.Branch + '_' + fileinfo.Version + '.txt');
  }

  public newForm(id: number): Observable<any> {

    /* const form: Form = {

    }; */

    return new Observable((observer) => {
      if (environment.production) {

      } else {
        this.msg.showMessage('info', 'Keine SharePoint-Verbindung.');
        observer.error();
      }

      observer.complete();
    });
  }

}
