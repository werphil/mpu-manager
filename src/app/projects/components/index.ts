import { FormItemVersionComponent } from './form-item-version/form-item-version.component';
import { FormVersionsComponent } from './form-versions/form-versions.component';
import { FormItemComponent } from './form-item/form-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFilterPipe } from '../pipes/ProjectFilter.pipe';
import { FormsModule } from '@angular/forms';
import { PrimeModule } from '../../prime/prime.module';
import { RouterModule } from '@angular/router';
import { ProjectItemComponent } from './project-item/project-item.component';


export const COMPONENTS = [
    ProjectItemComponent,
    ProjectListComponent,
    FormItemComponent,
    FormVersionsComponent,
    FormItemVersionComponent,
    ProjectFilterPipe
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        PrimeModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class ComponentsModule {}
