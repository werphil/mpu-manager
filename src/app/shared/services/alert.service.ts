import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

constructor(private msg: MessageService) { }

showMessage(style: 'success' | 'error' | 'info', text: string) {
  console.log('????');
  const title = style === 'success' ? 'Erfolg' : style === 'error' ? 'Fehler' : 'Info';
  this.msg.add({severity: style, summary: title, detail: text });
}

}
