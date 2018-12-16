import { SpecificationElement } from './../../../models/element';
import { SpecCategory } from './../../../config/spec.config';
import { ControlConfig } from '../../../config/controls.config';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mpu-spec-element',
  templateUrl: './spec-element.component.html',
  styleUrls: ['./spec-element.component.scss']
})
export class SpecElementComponent implements OnInit {

  @Input() element: SpecificationElement;
  @Input() config: SpecCategory[];

  @Output() selectElement = new EventEmitter<number>();
  @Output() copyText = new EventEmitter<string>();

  controlConfig = ControlConfig;

  constructor() { }

  ngOnInit() {
  }

}
