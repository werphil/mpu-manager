
import { Store } from '@ngrx/store';
import { ProjectService } from './../shared/services/project.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

import * as fromForms from './reducers';
import { Observable, of } from 'rxjs';

/**
 * TODO: Ungültige Formular-IDs abfangen und 404 anzeigen o.ä.
 */
@Injectable({
    providedIn: 'root',
  })
  export class FormExistsGuard implements CanActivate {
    constructor(
      private store: Store<fromForms.State>,
      private svc: ProjectService,
      private router: Router
    ) {}

    
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return of(true);
    }
}
