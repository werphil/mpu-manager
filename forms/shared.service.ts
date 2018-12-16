import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from './../environments/environment';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // Besteht eine Sharepoint-Verbindung?
  private _hasSharepointConnection = false;

// constructor(private msg: MessageService, private http: HttpClient) { }
  /**
   * Sharepoint benötigt zur Authentifikation einen DIGEST-Code, der bei allen POST und PUT Requests gegen die REST-Schnittstelle
   * mitgegeben werden muss über den X-RequestDigest Header.
   */
  getSharepointConnection(): Observable<boolean> {
      return new Observable<boolean>((observer) => {
        observer.next(this._hasSharepointConnection);

          if (environment.production) {

            this.http.post(environment.apiPath + '_api/contextinfo', '', {
              headers: new HttpHeaders({
                  'Content-Type': 'application/json;odata=verbose',
                  'accept': 'application/json;odata=verbose',
              })
            }).subscribe(data => {
                if (data['d'] && data['d'].GetContextWebInformation && data['d'].GetContextWebInformation.FormDigestValue) {
                    localStorage.setItem('digest', data['d'].GetContextWebInformation.FormDigestValue);
                    this._hasSharepointConnection = true;
                } else {
                  this._hasSharepointConnection = true;
                  this.showMessage('error', 'Sharepoint-Schlüssel nicht gespeichert.');
                  console.log('Konnte Digest von Sharepoint nicht speichern.');
                }
                observer.next(this._hasSharepointConnection);
            }, error => {
              this._hasSharepointConnection = false;
              observer.next(this._hasSharepointConnection);
            });
          }
      });
  }

  showMessage(style: 'success' | 'error' | 'info', text: string) {
    const title = style === 'success' ? 'Erfolg' : style === 'error' ? 'Fehler' : 'Info';
    this.msg.add({severity: style, summary: title, detail: text });
  }


    /**
   * Kopiert einen Text in die Zwischenablage (copy to clipboard)
   * @param text der in die Zwischenablage eingefügt werden soll
   */
  copy2clipboard(text: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
