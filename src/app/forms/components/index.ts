import { ModelPageComponent } from './model/model-page/model-page.component';
import { ModelSidebarComponent } from './model/model-sidebar/model-sidebar.component';
import { ModelToolComponent } from './model/model-tool/model-tool.component';
import { ModelToolsComponent } from './model/model-tools/model-tools.component';
import { PipesModule } from './../pipes/index';
import { SpecItemComponent } from './spec/spec-item/spec-item.component';
import { SpecCategoryComponent } from './spec/spec-category/spec-category.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { SpecElementComponent } from './spec/spec-element/spec-element.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { PrimeModule } from '../../prime/prime.module';
import { RouterModule } from '@angular/router';
import { ModelFormComponent } from './model/model-form/model-form.component';
import { ModelGroupComponent } from './model/model-group/model-group.component';
import { ModelElementComponent } from './model/model-element/model-element.component';



export const COMPONENTS = [
    FormDetailsComponent,
    SpecElementComponent,
    SpecCategoryComponent,
    SpecItemComponent,
    ModelToolsComponent,
    ModelToolComponent,
    ModelFormComponent,
    ModelPageComponent,
    ModelGroupComponent,
    ModelElementComponent,
    ModelSidebarComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        PrimeModule,
        PipesModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class ComponentsModule {}
