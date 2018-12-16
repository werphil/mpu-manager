import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ManagerEffects } from './effects/manager.effects';
import { ComponentsModule } from './components';
import { ProjectsHomeComponent } from './containers/projects-home/projects-home.component';
import { PrimeModule } from '../prime/prime.module';
import { FormsModule } from '@angular/forms';
import { ProjectsRoutingModule } from './projects.routing';
import { CoreModule } from '../core/core.module';
import { FormHomeComponent } from './containers/form-home/form-home.component';
import { FormManagerComponent } from './containers/form-manager/form-manager.component';
import { ProjectEffects } from './effects/project.effects';


const COMPONENTS = [
    ProjectsHomeComponent,
    FormHomeComponent,
    FormManagerComponent
];

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        ProjectsRoutingModule,
        FormsModule,
        PrimeModule,
        CoreModule,
        StoreModule.forFeature('projects', reducers),
        EffectsModule.forFeature([ManagerEffects, ProjectEffects])
    ],
    declarations: COMPONENTS,
    // exports: COMPONENTS
})
export class ProjectsModule {}
