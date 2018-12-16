import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';


/**
 * Synchronisiert das lokale Datenmodell mit Sharepoint
 */

@Injectable()
export class CoreEffects {

    constructor(private actions: Actions) {}

}
