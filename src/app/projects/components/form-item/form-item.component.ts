import { ViewForm } from './../../models/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mpu-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent implements OnInit {

  constructor() { }

  @Input() form: ViewForm;

  ngOnInit() {
  }

}
