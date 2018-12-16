
import { FormActionTypes, Load, LoadSuccess, LoadError } from './../actions/form.actions';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { FormService } from './../../shared/services/form.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';


@Injectable()
export class FormEffects {

    constructor(private actions: Actions, private svc: FormService) {}
    
    @Effect()
    getFormFile: Observable<Action> = this.actions.pipe(
        ofType<Load>(FormActionTypes.Load),
        map(action => action.payload),
        mergeMap(info => this.svc.getFormFile(info).pipe(
            map((ret) => new LoadSuccess(ret)),
            catchError((error) => of(new LoadError(error)))
        ))
    );
}
