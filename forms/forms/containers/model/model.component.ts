import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../data.service';
import { Formular } from '../../../classes/controls';

import { NgbModal, NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  
  public form: Formular;
  public neueSeiteName = 'Neue Formularseite';
  
  selTab: string;

  
  constructor(
    private dataservice: DataService,
    private modalService: NgbModal) { 

      this.form = null;
    }
  
  
  
  ngOnInit() {
    this.form = this.dataservice.getForm();
    this.dataservice.getFormdata().subscribe(formdata => {
      this.form = formdata;
      this.selTab = 'seite-0';
    });
  }
  
  openRenameDlg(dlgRef) {
    this.modalService.open(dlgRef);
  }
  
  renameForm() {
    // this.dataservice.renameForm(this.form.metadata.name);
  }
  
  // Öffnet einen Dialog
  openDialog(dlgRef) {
    this.modalService.open(dlgRef);
  }
  
  // Erstellt �ber das Dataservice eine neue Formularseite
  newFormPage() {
    this.dataservice.newPage(this.neueSeiteName);
  }

  public beforeChange($event: NgbTabChangeEvent, dlgRef) {
    if ($event.nextId === 'tab-new') {
      $event.preventDefault();
      this.openDialog(dlgRef);
    }
  }

  tojson(json) {
    return JSON.stringify(json);
  }

}
