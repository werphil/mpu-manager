
import { Observable } from 'rxjs';
import * as ManagerActions from './../../../projects/actions/manager.actions';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../../reducers';
import * as fromExplorer from '../../../projects/selectors';


@Component({
  selector: 'mpu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.loading$ = this.store.pipe(select(fromExplorer.ProjectsLoading));
    this.loaded$ = this.store.pipe(select(fromExplorer.ProjectsLoaded));
  }

  ngOnInit() {
    // Wenn noch nicht geladen, dann Projekte laden
    this.loaded$.subscribe(data => {
      if (!data) {
        this.store.dispatch(new ManagerActions.Load());
      }
    });
  }

}


