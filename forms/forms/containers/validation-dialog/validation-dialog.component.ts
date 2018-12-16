import { XControl } from './../../../../classes/controls';
import { Patterns, PatternType, RangeType, OptionType } from './../../../../config/validation';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit, Input } from '@angular/core';
import { ValidationType, Validierungen, ValidationSet, ValidationConfig, PatternChip } from '../../../../config/validation';

import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-validation-dialog',
  templateUrl: './validation-dialog.component.html',
  styleUrls: ['./validation-dialog.component.css']
})
export class ValidationDialogComponent implements OnInit {

  @Input() active: XControl;

  validierungen = Validierungen;
  validTyp = ValidationType;
  validConfig = ValidationConfig;
  patterns = Patterns;
  patternTyp = PatternType;
  rangeTyp = RangeType;
  anzahlTyp = OptionType;

  separatorKeysCodes = [ENTER, COMMA];

  activePattern = -1;


  constructor(public activeModal: NgbActiveModal) {
   }

  ngOnInit() {
    if (!this.active.validation.custom || this.active.validation.custom === null) {
      this.active.validation.custom = new Array<PatternChip>();
    }
  }

  addFromText (event) {
    let value: string = event.value;

    if (value) {
      value = value.trim();
      const val = value.substring(0, 1);
      if (val.toLowerCase() === 'b') {
        this.add(PatternType.Letter);
      } else if (val.toLowerCase() === 'z') {
        this.add(PatternType.Number);
      } else if (val === '*') {
        this.add(PatternType.All);
      }

    }

    event.input.value = '';
    
  }

  add (typ: PatternType) {

    const neu: PatternChip = {
      viewText: Patterns[typ].name,
      type: typ,
      optional: false,
    };

    if (Patterns[typ].menge) {
      neu.anzahl = {
        art: OptionType.Alle,
        minValue: 0,
        max: 0
      };
    }

    if (Patterns[typ].range !== RangeType.None) {
      const defVal = (Patterns[typ].range === RangeType.Numbers) ? 0 : '';
      neu.zeichen = {
        art: OptionType.Alle,
        minValue: defVal,
        max: 0
      };
    }
    this.activePattern = this.active.validation.custom.length;
    this.active.validation.custom.push(neu);
    
  }

  remove(el: any) {
    const index = this.active.validation.custom.indexOf(el);

    if (index >= 0) {
      this.active.validation.custom.splice(index, 1);
      this.activePattern = -1;
    }
  }

  getViewtext(pattern: PatternChip): string {
    let s: string;

    if (pattern.type === PatternType.Or) {
      return 'oder';
    }

    s = '';

    if (pattern.type === PatternType.All) {
      s += 'Alle Zeichen';
    } else if (pattern.type === PatternType.Whitespace) {
      s += 'Leerzeichen';
    } else {
      if (pattern.zeichen.art === OptionType.Alle) {
        s += (pattern.type === PatternType.Number) ? '0-9' : 'A-Z';
      } else if (pattern.zeichen.art === OptionType.Genau) {
        s += <string>pattern.zeichen.minValue;
      } else {
        s += <string>pattern.zeichen.minValue + '-' + String(pattern.zeichen.max);
      }
    }

    if (pattern.anzahl) {
      if (pattern.anzahl.art === OptionType.Alle) {
        s += ' (~)';
      } else if (pattern.anzahl.art === OptionType.Genau) {
        s += ' (' + pattern.anzahl.minValue + 'x)';
      } else {
        s += ' (' + pattern.anzahl.minValue + '-' + pattern.anzahl.max + 'x)';
      }
    }

    return s;
  }

}
