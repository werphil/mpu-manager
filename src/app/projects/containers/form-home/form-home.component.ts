import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { State } from '../../reducers';

import { ActivatedRoute } from '@angular/router';

import * as FormActions from '../../actions/form.actions';
import * as get from '../../selectors';

import { map } from 'rxjs/operators';
import { ProjectService } from '../../../shared/services/project.service';
import { Load } from '../../actions/manager.actions';

@Component({
  selector: 'mpu-form-home',
  templateUrl: './form-home.component.html',
  styleUrls: ['./form-home.component.scss']
})
export class FormHomeComponent implements OnDestroy, OnInit {

  actions$: Subscription;
  loaded$: Observable<any>;
  showForms = false;
  private hasProjectsLoaded = false;

  constructor(private store: Store<State>, private route: ActivatedRoute, private svc: ProjectService) {
    this.hasProjectsLoaded = this.svc.hasProjectsLoaded();
    
    if (!this.hasProjectsLoaded) {
      this.store.dispatch(new Load());
      this.loaded$ = this.store.pipe(select(get.ProjectsLoaded));
    } else {
      this.showForms = true;
      this._subscribe();
    }
  }

  ngOnInit(): void {
    if (!this.hasProjectsLoaded) {
      this.loaded$.subscribe((finishedLoading) => {
        if (finishedLoading) {
          this.hasProjectsLoaded = true;
          this._subscribe();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.actions$.unsubscribe();
  }

  private _subscribe() {
    this.actions$ = this.route.params.pipe(
        map(params => new FormActions.Select(parseInt(params.id, 10)))
      ).subscribe(this.store);
  }

}
