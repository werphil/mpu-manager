
import { Action } from '@ngrx/store';

export enum ElementActionTypes {
    Select = '[Element] wurde selektiert'
}

export class Select implements Action {
    readonly type = ElementActionTypes.Select;

    constructor(public payload: number) {}
}


export type ElementActions =
| Select;
