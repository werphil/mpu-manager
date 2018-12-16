import { DataService } from './../../data.service';
import { ControlType } from './../../../config/controlconfig';
import { XControl } from './../../../classes/controls';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preview-element',
  templateUrl: './preview-element.component.html',
  styleUrls: ['./preview-element.component.css']
})
export class PreviewElementComponent implements OnInit {

  @Input() element;
  @Input() form: FormGroup;

  ControlType = ControlType;
  infoActive = false;

  constructor(private datasvc: DataService) { }

  ngOnInit() {
  }

  showElement(): boolean {
    return this.datasvc.showElement(this.element);
  }

  getFormgroup() {
    return this.datasvc.getFormgroup(this.element.path);
  }

  getValue() {
    return this.datasvc.getElementValue(this.element.linkedID);
  }

}
