import { DiffType } from './../../vergleich/FormComparer';
import { ValidationType, ValidationConfig, chips2regex } from './../../../config/validation';
import { DataService } from './../../data.service';
import { XControl } from './../../../classes/controls';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Compare } from '../../vergleich/FormComparer';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'element-detail',
  templateUrl: './element-detail.component.html',
  styleUrls: ['./element-detail.component.css']
})
export class ElementDetailComponent implements OnInit {

  @Input() element: any;
  @Input() change: any ;
  @Output() elementSelected = new EventEmitter();

  
  constructor(private datasvc: DataService) { 
    
  }


  ngOnInit() {
    
  }


  selectElement(el) {
    this.elementSelected.emit(el);
  }

  getParent(el): {} {
    const path = el.path;
    
    if (!path.includes('/')) {
      return {
        root: true
      };
    }

    const parts = path.split('/');
    const parent = parts[parts.length - 2];
    const isGroup = (parent.substr(0, 1) === 'g');

    const parentEl = (isGroup) ? this.datasvc.getElementById(Number(parent.substr(1))) : this.datasvc.getPage(Number(parent.substr(1)));
    const txt = parentEl['label'] || parentEl['name']; 
    return {
      root: false,
      isGroup: isGroup,
      parent: parentEl,
      text: txt
    };

  }

  getValidation(el): string {
    if (!el.validation || el.validation.typ === ValidationType.None) {
      return 'keine';
    }

    switch (el.validation.typ) {
      case ValidationType.Email:
      case ValidationType.FBNr:
      case ValidationType.SVNr:
        return ValidationConfig[el.validation.typ].pattern;

      case ValidationType.Int:
        return 'Ganzzahl, min: ' + el.validation.min + ' | max: ' + el.validation.max;

      case ValidationType.Decimal:
        return 'Dezimal, min: ' + el.validation.min + ' | max: ' + el.validation.max + ' | Kommastellen: ' + el.validation.komma;

      case ValidationType.Text:
        return 'Text, Mindestanzahl Zeichen: ' + el.validation.min + ' | Maxanzahl Zeichen: ' + el.validation.max;
      
      case ValidationType.Regex:
        return el.validation.regex;

      case ValidationType.Custom:
        return chips2regex(el.validation.custom);

      default:
        return 'Keine';
    }

  }



  c2c(text: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
