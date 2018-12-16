import { ElementTypes } from './../../../models/interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mpu-model-tool',
  templateUrl: './model-tool.component.html',
  styleUrls: ['./model-tool.component.scss']
})
export class ModelToolComponent implements OnInit {

  @Input() name: string;
  @Input() type: ElementTypes;
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
