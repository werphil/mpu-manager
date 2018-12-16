import { ProjectService } from './../../../shared/services/project.service';

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';


import { ProjectListProject } from '../../models/project';
import { Store, select } from '@ngrx/store';

import * as get from '../../selectors';
import { State } from '../../reducers';
import * as ManagerActions from '../../actions/manager.actions';
import * as ProjectActions from '../../actions/project.actions';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'mpu-projects',
  templateUrl: './projects-home.component.html',
  styleUrls: ['./projects-home.component.scss']
})
export class ProjectsHomeComponent implements OnInit {

  projects$: Observable<ProjectListProject[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  isSharePointError = true; // Steuert Anzeige für Hinweis, ob Sharepoint-Verbindung

  new = {
    project: {
      show: false
    },
    form: {
      show: false,
      projectId: 0, 
      projectName: '' // Zu welchem Projekt wird das Formular hinzugefügt?
    }
  };

  filter = '';

  constructor (private store: Store<State>, private svc: ProjectService, private msg: AlertService) {
    this.projects$ = this.store.pipe(select(get.ProjectList));
    this.loading$ = this.store.pipe(select(get.ProjectsLoading));
    this.loaded$ = this.store.pipe(select(get.ProjectsLoaded));
  }
  
  
  ngOnInit() {
    // this.shared.getSharepointConnection().subscribe(result => this.isSharePointError = !result);
    if (!this.svc.hasProjectsLoaded()) {
      this.store.dispatch(new ManagerActions.Load());
    }
  }

  selectProject(event) {
    this.new.form.projectId = event.id;
    this.new.form.projectName = event.name;
    this.new.form.show = true;
  }

  addForm(name: string) {
    
    if (name.length < 3) {
      this.msg.showMessage('error', 'Bitte einen Namen eingeben!');
      return;
    }

    this.store.dispatch(new ProjectActions.AddForm({
      Name: name,
      ProjectId: this.new.form.projectId
    }));
  }

  addProject(name: string) {
    if (name.length < 3) {
      this.msg.showMessage('error', 'Bitte einen Namen eingeben!');
      return;
    }
    this.store.dispatch(new ManagerActions.AddProject(name));
  }

}
