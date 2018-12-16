import { FormModelComponent } from './containers/form-model/form-model.component';
import { FormInfoComponent } from './containers/form-info/form-info.component';
import { FormViewComponent } from './containers/form-view/form-view.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '../core/containers/page-not-found';
import { FormSpecComponent } from './containers/form-spec/form-spec.component';


export const routes: Routes = [
    {
        path: '', component: PageNotFoundComponent, pathMatch: 'full'
    },
    {
        path: ':id/:branch/:version', component: FormViewComponent, children: [
            { path: 'home', component: FormInfoComponent },
            { path: '', pathMatch: 'full', redirectTo: 'home' },
            { path: 'spec', component: FormSpecComponent },
            { path: 'model', component: FormModelComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormsRoutingModule {}
