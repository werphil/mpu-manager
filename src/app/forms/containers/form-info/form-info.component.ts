import { FormModel } from './../../models/form';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { State } from '../../../reducers';
import * as get from '../../selectors';
import * as getProject from '../../../projects/selectors';
import { ViewForm } from '../../../projects/models/forms';

@Component({
  selector: 'mpu-form-info',
  templateUrl: './form-info.component.html',
  styleUrls: ['./form-info.component.scss']
})
export class FormInfoComponent implements OnInit {

  form$: Observable<FormModel>; // Nur ein ViewModel
  pform$: Observable<ViewForm>;

  constructor(private store: Store<State>) {
    this.form$ = this.store.pipe(select(get.FormData));
    // this.form$  = this.store.pipe(select(getProject.))
  }

  ngOnInit() {
  }

}
