import { ModelElement } from './../models/element';

import { Action } from '@ngrx/store';

export enum PageActionTypes {
    AddElement = '[Page] Neues Element',
    DeleteElement = '[Page] Element gelöscht',
    SelectPage = '[Page] Seite wurde selektiert'
}

export class AddElement implements Action {
    readonly type = PageActionTypes.AddElement;

    constructor(public payload: ModelElement) {}
}

export class DeleteElement implements Action {
    readonly type = PageActionTypes.DeleteElement;

    constructor(public payload: ModelElement) {}
}

export class SelectPage implements Action {
    readonly type = PageActionTypes.SelectPage;

    constructor(public payload: number) {}
}

export type PageActions =
| AddElement
| DeleteElement
| SelectPage;
