import { ConditionDialogComponent } from './../condition-dialog/condition-dialog.component';

import { FormPage } from '../../../../classes/controls';

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageComponent implements OnInit {
  
  @Input() page: FormPage;
  
   optionen = {
     showGrid: false
   };
  
  constructor(private modalService: NgbModal) { }
  
  ngOnInit() {
    
  }

  openPageDlg(dlgPage) {
    const dlgRef = this.modalService.open(dlgPage);
  }

  openConditionDlg() {
    const dlgRef = this.modalService.open(ConditionDialogComponent, { size: 'lg'});
    dlgRef.componentInstance.active = this.page;
  }

  stringify(json): string {
    return JSON.stringify(json, null, 2);
  }
  

}
