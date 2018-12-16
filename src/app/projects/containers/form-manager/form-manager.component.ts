import { ViewForm } from './../../models/forms';

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../reducers';
import { Observable } from 'rxjs';

import * as get from '../../selectors';

@Component({
  selector: 'mpu-form-manager',
  templateUrl: './form-manager.component.html',
  styleUrls: ['./form-manager.component.scss']
})
export class FormManagerComponent implements OnInit {

  form$: Observable<ViewForm>;

  constructor(private store: Store<State>) {
    this.form$ = this.store.pipe(select(get.SelectedForm)) as Observable<ViewForm>;
  }

  ngOnInit() {
  }

}
