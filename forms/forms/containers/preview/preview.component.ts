import { XControl } from './../../classes/controls';
import { FormGroup } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Formular, FormPage } from '../../classes/controls';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  form: Formular;
  formdata: FormGroup;

  show = {
    umschlag: false,
    page: null
  };
  
  constructor(private datasvc: DataService) {
    this.form = null;
    this.formdata = null;
   }

  ngOnInit() {
    this.form = this.datasvc.getForm();
    this.init();
    
    this.datasvc.getFormdata().subscribe(formdata => {
      this.form = formdata;
      this.init();
    });
  }

  private init() {
    this.show.page = this.form.pages[0];
    this.formdata = this.datasvc.toFormGroup();
  }
  
  toString(): string {
    return JSON.stringify(this.form, null, 2);
  }
  showPage(page): boolean {
    if (!page.conditions || page.conditions.length === 0) {
      return true;
    }
    return this.datasvc.showElement(page);
  }
  
  notFirstPage(): boolean {
    return (this.form.pages.indexOf(this.show.page) > 0);
  }



}
