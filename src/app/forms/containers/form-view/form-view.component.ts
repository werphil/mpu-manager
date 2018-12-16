import { ViewForm } from './../../../projects/models/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../../reducers';
import * as FormActions from '../../actions/form.actions';
import { map } from 'rxjs/operators';
import * as get from '../../selectors';
import * as fromProjects from '../../../projects/selectors';

/**
 * Lädt das FormFile
 */

@Component({
  selector: 'mpu-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnDestroy, OnInit {

  actions$: Subscription;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;

  projectForm$: Observable<ViewForm>;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {

    this.loaded$ = this.store.pipe(select(get.FormLoaded));
    this.loading$ = this.store.pipe(select(get.FormLoading));
  }

  ngOnInit(): void {
    this.actions$ = this.route.params.pipe(
      map(params => {
        this.projectForm$ = this.store.pipe(select(fromProjects.SelectFormById(params.id)));

        return new FormActions.Load({
          Id: parseInt(params.id, 10),
          Branch: parseInt(params.branch, 10),
          Version: parseInt(params.version, 10)
        });
      })
    ).subscribe(this.store);
  }

  ngOnDestroy(): void {
    this.actions$.unsubscribe();
  }


}
