import { FormActions, FormActionTypes } from './../actions/form.actions';

import { FormModel } from './../models/form';


export interface State {
    loaded: boolean;
    loading: boolean;
    pageIds: number[];
    form: FormModel;
    sidebar: boolean;
    selectedPage: number;
}

const INIT_STATE: State = {
    loaded: false,
    loading: false,
    pageIds: [],
    form: {
        Name: '',
        NextId: {
            Page: 1,
            Element: 1
        },
        Transmission: {
            Type: 'Lokales Speichern',
            Receiver: ''
        },
        Logo: '',
        Envelope: ''
    },
    sidebar: false,
    selectedPage: 0
};

export function reducer(
    state = INIT_STATE,
    action: FormActions
): State {
    switch (action.type) {
        case FormActionTypes.Load: {
            return {
                ...state,
                loading: true
            };
        }

        case FormActionTypes.LoadSuccess: {
            return {
                loaded: true,
                loading: false,
                pageIds: action.payload.Pages.map(page => page.Id),
                form: <FormModel>{
                    Name: action.payload.Name,
                    NextId: action.payload.NextId,
                    Transmission: action.payload.Transmission,
                    Logo: action.payload.Logo,
                    Envelope: action.payload.Envelope
                },
                sidebar: false,
                selectedPage: state.selectedPage
            };
        }
        case FormActionTypes.LoadError: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case FormActionTypes.UpdateNextIds: {
            return {
                ...state,
                form: {
                    ...state.form,
                    NextId: action.payload
                }
            };
        }

        case FormActionTypes.AddPage: {
            return {
                ...state,
                pageIds: state.pageIds.push(state.form.NextId.Page)
            };
        }

        default: {
            return state;
        }
    }
}

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getIds = (state: State) => state.pageIds;
export const getForm = (state: State) => state.form;
export const getSelectedPage = (state: State) => state.selectedPage;
