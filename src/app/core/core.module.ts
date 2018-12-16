import { SharepointConnectionComponent } from './components/sharepoint-connection/sharepoint-connection.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './containers/app-component';
import { PageNotFoundComponent } from './containers/page-not-found';
import { TopnavComponent } from './components/topnav';
import { PrimeModule } from '../prime/prime.module';


export const COMPONENTS = [
    AppComponent,
    TopnavComponent,
    SharepointConnectionComponent,
    PageNotFoundComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PrimeModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CoreModule {}
