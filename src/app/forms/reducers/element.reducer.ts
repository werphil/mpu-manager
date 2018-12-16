
import { ElementActionTypes, ElementActions } from './../actions/element.actions';
import { FormActionTypes, FormActions } from './../actions/form.actions';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FormElement } from '../models/interfaces';
import { ModelElement } from '../models/element';



export interface State extends EntityState<ModelElement> {
    selectedElementId: number | null;
}

export const adapter: EntityAdapter<ModelElement> = createEntityAdapter<ModelElement>({
    selectId: (element: ModelElement) => element.Id,
    sortComparer: (a, b) => a.ParentId - b.Id
});

export const INIT_STATE: State = adapter.getInitialState({
    selectedElementId: null
});


export function reducer(
    state = INIT_STATE,
    action: FormActions | ElementActions
): State {
    switch (action.type) {
        case FormActionTypes.LoadSuccess: {
            // Normalisieren
            return adapter.addMany(normalizeElements(action.payload.Pages), state);
        }

        case ElementActionTypes.Select: {
            return {
                ...state,
                selectedElementId: action.payload
            };
        }

        default: {
            return state;
        }
    }
}
/**
 * Jedes Element ist flach in der Entity-Collection, Rows werden nur als Sammlung von Ids erfasst (sortiert nach Position)
 * @param element 
 * @param arr 
 */
function normalizeElements(elements: FormElement[]): ModelElement[] {

    const out: ModelElement[] = [];

    elements.forEach(element => {
        if (!!element.Rows) {
            out.push(<ModelElement>{
                ...element,
                Children: element.Rows.map(row => row.Id)
            });
            out.push.apply(out, normalizeElements(element.Rows));
        } else {
            out.push(element);
        }
    });
    return out;
}

export const getSelectedId = (state: State) => state.selectedElementId;
export const getIds = (state: State) => state.ids;
