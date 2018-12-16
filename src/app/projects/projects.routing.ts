import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectsHomeComponent } from './containers/projects-home/projects-home.component';
import { FormHomeComponent } from './containers/form-home/form-home.component';

export const routes: Routes = [
    {
        path: '', component: ProjectsHomeComponent
    },
    {
        path: 'forms/:id', component: FormHomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule {}
