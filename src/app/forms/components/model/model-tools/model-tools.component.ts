import { ToolCategory } from './../../../config/tools.config';
import { Component, OnInit, Input } from '@angular/core';
import { ControlConfig } from '../../../config/controls.config';

@Component({
  selector: 'mpu-model-tools',
  templateUrl: './model-tools.component.html',
  styleUrls: ['./model-tools.component.scss']
})
export class ModelToolsComponent implements OnInit {

  @Input() config: ToolCategory[];

  cfg = ControlConfig;

  constructor() { }

  ngOnInit() {
  }

}
