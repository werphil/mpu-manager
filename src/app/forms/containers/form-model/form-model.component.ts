import { AddPage } from './../../actions/form.actions';
import { ModelForm } from './../../models/form';
import { Observable } from 'rxjs';
import { ToolConfig, ToolCategory } from './../../config/tools.config';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { State } from '../../../reducers';
import * as get from '../../selectors';

@Component({
  selector: 'mpu-form-model',
  templateUrl: './form-model.component.html',
  styleUrls: ['./form-model.component.scss']
})
export class FormModelComponent implements OnInit {

  form$: Observable<ModelForm>;

  toolConfig: ToolCategory[] = ToolConfig;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.form$ = this.store.pipe(select(get.FormForModelling));
  }

  addElement(element) {
    this.store.dispatch(new AddPage('Neu'));
  }

}
