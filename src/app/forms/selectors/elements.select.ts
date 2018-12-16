
import { createSelector } from '@ngrx/store';
import { getState } from './form.select';
import * as fromElements from '../reducers/element.reducer';
import { SpecNode, ModelElement, SpecElement, SpecificationElement, FormPage } from '../models/element';
import { FormElement } from '../models/interfaces';
import { Dictionary } from '@ngrx/entity';
import { ControlConfig } from '../config/controls.config';


const getEntityState = createSelector(
    getState,
    state => state.elements
);

export const {
    selectIds: getIds,
    selectEntities: getElementEntities,
    selectAll: getAllElements
} = fromElements.adapter.getSelectors(getEntityState);

export const getFormPages = createSelector(
    getAllElements,
    (elements) => elements.filter(el => el.Type === 'FormPage').sort((a, b) => a.Position - b.Position)
);

export const getElementTree = createSelector(
    getAllElements,
    (elements) => getNestedChildren(elements, 0)
);

export const getSpecificationNodes = createSelector(
    getAllElements,
    getElementEntities,
    // Struktur ausgehend von Formularseiten
    (elements, entities) => getTreeStructure<SpecNode>(
        elements.filter(el => el.Type === 'FormPage').map(el => el.Id), entities, (el) => 
        <SpecNode>{
            ...el,
            children: el.Rows,
            label: (el.Label.length > 15) ? el.Label.substr(0, 15) + '...' : el.Label,
            expanded: false,
            icon: ControlConfig[el.Type].Icon,
            collapsedIcon: (el.Type === 'FormPage') ? 'fas fa-folder' : 'far fa-folder',
            expandedIcon: (el.Type === 'FormPage') ? 'fas fa-folder-open' : 'far fa-folder-open'
        })
);

export const getSelected = createSelector(
    getEntityState,    
    fromElements.getSelectedId
);

export const getModelTree = createSelector(
    getAllElements,
    getElementEntities,
    (elements, entities) => getTreeStructure<FormPage>(
        elements.filter(el => el.Type === 'FormPage').map(el => el.Id), entities)
);


function getTreeStructure<T>(ids: number[], entities: Dictionary<ModelElement>, mapping?: (element: any) => T): T[] {
    const out = [];
    
    ids.forEach(id => {
        const entity = entities[id];
        const element = <FormElement>entity;

        if (!!entity.Children) {
            element.Rows = <T[]>getTreeStructure<T>(entity.Children, entities, mapping);
        }
        if (!!mapping) {
            out.push(mapping(element));
        } else {
            out.push(element);
        }
    });
        
    return out;
}


function getNestedChildren(arr, parent) {
    const out = [];
    for (const i in arr) {
        if (arr[i].parentId === parent) {
            const children = getNestedChildren(arr, arr[i].id);

            if (children.length) {
                arr[i].children = children;
            }
            out.push(arr[i]);
        }
    }
    return out;
}
