import { Action } from '@ngrx/store';


export enum CoreActionTypes {
    GetCurrentUser = '[Core] Sharepoint-User'
}

export class GetCurrentUser implements Action {
    readonly type = CoreActionTypes.GetCurrentUser;

    constructor(public payload: string) {}
}

export type CoreActions =
 | GetCurrentUser;
