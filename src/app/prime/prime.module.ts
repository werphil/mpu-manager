import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { TreeModule } from 'primeng/tree';
import { MessageService } from 'primeng/api';
import {TabViewModule} from 'primeng/tabview';

const MODULES = [
    ProgressSpinnerModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    SidebarModule,
    TreeModule,
    TabViewModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES,
    providers: [
        MessageService
    ]
})
export class PrimeModule {}
