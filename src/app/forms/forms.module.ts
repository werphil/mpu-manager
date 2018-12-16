import { FormModelComponent } from './containers/form-model/form-model.component';
import { PipesModule } from './pipes/index';
import { FormInfoComponent } from './containers/form-info/form-info.component';
import { FormEffects } from './effects/form.effects';
import { ComponentsModule } from './components/index';
import { FormViewComponent } from './containers/form-view/form-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { PrimeModule } from '../prime/prime.module';
import { FormsModule } from '@angular/forms';
import { FormsRoutingModule } from './forms.routing';
import { CoreModule } from '../core/core.module';
import { FormSpecComponent } from './containers/form-spec/form-spec.component';



const COMPONENTS = [
    FormViewComponent,
    FormInfoComponent,
    FormSpecComponent,
    FormModelComponent
];

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FormsRoutingModule,
        FormsModule,
        PrimeModule,
        CoreModule,
        PipesModule,
        StoreModule.forFeature('forms', reducers),
        EffectsModule.forFeature([FormEffects])
    ],
    declarations: COMPONENTS,
    // exports: COMPONENTS
})
export class FormularModule {}
