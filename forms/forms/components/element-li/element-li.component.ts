import { Compare, DiffCategory } from './../../vergleich/FormComparer';
import { ControlConfig } from './../../../config/controlconfig';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { XControl } from '../../../classes/controls';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spec-element-li',
  templateUrl: './element-li.component.html',
  styleUrls: ['./element-li.component.css']
})
export class ElementLiComponent implements OnInit {

  @Input() element: XControl;
  @Input() viewElement;
  @Input() diffs: Compare[];
  @Output() clicked = new EventEmitter();


  cfg = ControlConfig;

  constructor() { }

  ngOnInit() {
  }

  elementClicked(el) {
    this.clicked.emit(el);
  }

  elementChanged(el): boolean {
    if (!this.diffs || this.diffs.length === 0) {
      return false;
    }

    for (const diff of this.diffs) {
      if (diff.category === DiffCategory.Element && diff.id === el.id) {
        return true;
      }
    }
    return false;
  }

}
