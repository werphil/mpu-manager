import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProjectService } from '../../shared/services/project.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { AddForm, ProjectActionTypes, AddFormSuccess, AddFormError } from '../actions/project.actions';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';



@Injectable()
export class ProjectEffects {

    constructor(private actions: Actions, private svc: ProjectService) {}

    @Effect()
    addForm: Observable<Action> = this.actions.pipe(
        ofType<AddForm>(ProjectActionTypes.AddForm),
        map(action => action.payload),
        mergeMap(neu => this.svc.addForm(neu.Name, neu.ProjectId).pipe(
                map((ret) => new AddFormSuccess(ret)),
                catchError((error) => of(new AddFormError(error)))
            )
        )
    );
}
