import { Observable } from 'rxjs';
import { Formular, XControl, ViewCondition, ElementList } from './../../../../classes/controls';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './../../../data.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlType } from '../../../../config/controlconfig';

import {startWith, map} from 'rxjs/operators';


interface ConditionForm {
  bind: Observable<ElementList[]>;
    with: Observable<ElementList[]>;
}

@Component({
  selector: 'app-condition-dialog',
  templateUrl: './condition-dialog.component.html',
  styleUrls: ['./condition-dialog.component.css']
})
export class ConditionDialogComponent implements OnInit {

  @Input() active: XControl;
  @Input() bind: XControl;
 

  _elements: ElementList[] = null;

  elements = {
    bind: null,
    with: null
  };

  operators = [
    {name: 'muss Wert haben', operator: '=='},
    {name: 'muss größer sein als', operator: '>'},
    {name: 'muss kleiner sein als', operator: '<'},
    {name: 'darf nicht sein', operator: '!='}
  ];

  private form: Formular;

  conditionForm: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private dataservice: DataService,
              private fb: FormBuilder) {
      this._elements = new Array<ElementList>();
      
      this.conditionForm = this.fb.group({
        bindGroup: ['', Validators.required],
        withGroup: '',
        operator: '',
        value: '',
        mode: 'und',
        toggler: false
      });

   }

  ngOnInit() {

    this.form = this.dataservice.getForm();
    this.makeOptions();

    if (this.bind) {
      this.conditionForm.patchValue({
        bindGroup: { p: null, e: {
          label: this.bind.label,
          id: this.bind.id,
          values: this.bind.werte || null
        }}
      });
    }

    this.dataservice.getFormdata().subscribe(formdata => {
      this.form = formdata;
      this.makeOptions();


/* für filter
      this.elements.bind = this.conditionForm.get('bindGroup').valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterGroup(this._elements, val))
      );
      */

    });

    

  }

  addCondition() {
    const formdata = this.conditionForm.value;
    

    let val = formdata.value;

    if (formdata.toggler && formdata.withGroup !== '') {
      val = 'id=' + formdata.withGroup.e.id;
    } 

    const cond: ViewCondition = {
      id: formdata.bindGroup.e.id,
      operator: formdata.operator || '==',
      value: val,
      mode: formdata.mode,
      position: (this.active.conditions.length + 1)
    };

    this.active.conditions.push(cond);
    this.conditionForm.reset({
      bindGroup: '',
      withGroup: '',
      operator: '',
      value: '',
      mode: 'und',
      toggler: false
    });
    this.conditionForm.markAsUntouched();
    this.conditionForm.markAsPristine();
  }

  move(nachOben: boolean, index: number) {
    const swap = this.active.conditions[index];

    if (nachOben) {
      if (index === 0) {
        return;
      }
      this.active.conditions[index] = this.active.conditions[index - 1];
      this.active.conditions[index - 1] = swap;
    } else {
      if (index >= this.active.conditions.length) {
        return;
      }
      this.active.conditions[index] = this.active.conditions[index + 1];
      this.active.conditions[index + 1] = swap;
    }
    
  }

  delete(index: number) {
    this.active.conditions.splice(index, 1);
  }

  private makeOptions(): void {
    
    this._elements = this.dataservice.getElementList();
    this.elements.bind = this._elements;
    this.elements.with = this._elements;

  }

  

  filterGroup(liste: ElementList[], val: string): ElementList[] {
    if (val) {
      return liste
        .map(group => ({ label: group.label, elements: this._filter(group.elements, val) }))
        .filter(group => group.elements.length > 0);
    }

    return liste;
  }

  private _filter(opt: ElementList[], val: string) {
    const filterValue = val.toLowerCase();
    return opt.filter(item => item.label.toLowerCase().startsWith(filterValue));
  }

  /**
   * Anzeige des Labels im Autocomplete
   * @param el 
   */
  displayLabel(el?: any): string {
    return el ? el.e.label : '';
  }

  getElementById(id: any): XControl {
    return this.dataservice.getElementById(<number>id);
  }

  isFormDisabled(): boolean {
    if (this.conditionForm.pristine || this.conditionForm.invalid) {
      return true;
    } 

    if (this.conditionForm.get('value').value !== '') {
      return false;
    }

      if (this.conditionForm.get('toggler').value) {
        return (this.conditionForm.get('withGroup').value === '');
      } 

      return (this.conditionForm.get('value').value === '');
    
  }

}
