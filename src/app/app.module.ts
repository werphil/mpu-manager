import { MessageService } from 'primeng/api';
import { ProjectsModule } from './projects/projects.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/containers/app-component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { PrimeModule } from './prime/prime.module';
import * as fromProjectStore from './projects/reducers';
import * as fromProjectEffects from './projects/effects/manager.effects';

@NgModule({
   imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        PrimeModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreModule.forFeature('projects', fromProjectStore.reducers),
        StoreRouterConnectingModule.forRoot({
                stateKey: 'router'
        }),
        HttpClientModule,
        CoreModule,
        EffectsModule.forRoot([fromProjectEffects.ManagerEffects])
   ],
   providers: [
        MessageService
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
