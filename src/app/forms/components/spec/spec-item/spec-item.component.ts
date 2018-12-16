import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SpecificationConfig } from '../../../config/spec.config';
import { ControlConfig } from '../../../config/controls.config';


@Component({
  selector: 'mpu-spec-item',
  templateUrl: './spec-item.component.html',
  styleUrls: ['./spec-item.component.scss']
})
export class SpecItemComponent implements OnInit {

  @Input() config: SpecificationConfig;
  @Input() type: string;
  @Input() value: string;
  @Input() wasChanged = false;

  @Output() selectElement = new EventEmitter<number>();
  @Output() copyText = new EventEmitter<string>();

  controls = ControlConfig;

  constructor() { }

  ngOnInit() {
  }

  c2c(): void {
    this.copyText.emit(this.value);
  }

}
