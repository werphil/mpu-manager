import { ExplorerFile } from './../models/manager';
import { ManagerActionTypes, LoadSuccess, LoadError, AddProject, AddProjectSuccess, AddProjectError } from './../actions/manager.actions';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, mergeMap } from 'rxjs/operators';
import { ProjectService } from '../../shared/services/project.service';


/**
 * Synchronisiert das lokale Datenmodell mit Sharepoint
 */

@Injectable()
export class ManagerEffects {

    constructor(private actions: Actions, private svc: ProjectService) {}

    @Effect()
    loadProjectList: Observable<Action> = this.actions.pipe(
        ofType(ManagerActionTypes.Load),
        switchMap(() => {
            if (this.svc.hasProjectsLoaded()) {
                return of(new LoadSuccess(this.svc.getFileStructure()));
            } else {
                return this.svc.getProjectList().pipe(
                    map((fileStructure: ExplorerFile ) => new LoadSuccess(fileStructure)),
                    catchError(error => of(new LoadError(error)))
                );
            }
        })
    );

    @Effect()
    addProject: Observable<Action> = this.actions.pipe(
        ofType<AddProject>(ManagerActionTypes.AddProject),
        map(action => action.payload),
        mergeMap(name => this.svc.addProject(name).pipe(
                map((ret) => new AddProjectSuccess(ret)),
                catchError((error) => of(new AddProjectError(error)))
            )
        )
    );
    
}
