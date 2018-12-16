import { ValidationType } from './../../config/validation';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Formular, FormPage } from '../../classes/controls';
import { ControlConfig } from '../../config/controlconfig';

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})
export class SpecificationComponent implements OnInit {
  
  form: Formular;
  cfg;
  validTyp = ValidationType;

  view = {
    mode: 'tree', // table oder tree,
    currPage: 0,
    element: null
  };
  
  constructor(private datasvc: DataService) {
    this.form = null;
    this.cfg = ControlConfig;
   }

  ngOnInit() {
    this.form = this.datasvc.getForm();
    this.datasvc.getFormdata().subscribe(formdata => this.form = formdata);
  }

  stringify(val) {
    return JSON.stringify(val);
  }

}
