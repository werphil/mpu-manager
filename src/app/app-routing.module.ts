import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/containers/page-not-found';


const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full'},
  {
    path: 'projects',
    loadChildren: './projects/projects.module#ProjectsModule' 
  },
  {
    path: 'forms',
    loadChildren: './forms/forms.module#FormularModule'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true})],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }


