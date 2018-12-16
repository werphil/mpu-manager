import { FormModel } from './../../models/form';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mpu-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent implements OnInit {

  @Input() form: FormModel;

  constructor() { }

  ngOnInit() {
  }

}
