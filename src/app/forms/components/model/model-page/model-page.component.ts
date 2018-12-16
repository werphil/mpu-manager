
import { Component, OnInit, Input } from '@angular/core';
import { FormPage } from '../../../models/element';

@Component({
  selector: 'mpu-model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.scss']
})
export class ModelPageComponent implements OnInit {

  @Input() page: FormPage;

  constructor() { }
  ngOnInit() {
  }

}
