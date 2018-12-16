import { VersionInfo } from './../../models/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[mpu-form-item-version]',
  templateUrl: './form-item-version.component.html',
  styleUrls: ['./form-item-version.component.scss']
})
export class FormItemVersionComponent implements OnInit {

  @Input() version: VersionInfo;
  @Input() formId: number;
  @Input() stage: 'P' | 'Q' | 'T' | 'L';

  constructor() { }

  ngOnInit() {
  }

}
