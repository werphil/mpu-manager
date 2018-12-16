import { SpecificationElement } from './../../../models/element';
import { SpecCategory, SpecItemCfg } from './../../../config/spec.config';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mpu-spec-category',
  templateUrl: './spec-category.component.html',
  styleUrls: ['./spec-category.component.scss']
})
export class SpecCategoryComponent implements OnInit {

  @Input() config: SpecCategory;
  @Input() element: SpecificationElement;

  @Output() selectElement = new EventEmitter<number>();
  @Output() copyText = new EventEmitter<string>();

  cfg = SpecItemCfg;

  constructor() { }

  ngOnInit() {
    console.log(this.element);
  }

  showCategory(): boolean {

    for (const item of this.config.Items) {
      if (!!this.element[item] && (!this.element[item].hasOwnProperty('length') || this.element[item][length] > 0)) {
        return true;
      }
    }
    return false;
  }

}
