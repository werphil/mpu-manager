import { ControlConfig } from './../config/controls.config';
import { SpecNode, SpecificationElement, SpecElement } from './../models/element';
import { createSelector } from '@ngrx/store';

import * as form from './form.select';
import * as element from './elements.select';
import { ModelForm } from '../models/form';

/**
 * FORMULAR MAIN
 */
export const FormLoaded = form.getLoaded;
export const FormLoading = form.getLoading;

export const FormData = form.getForm;

// VIEWS
export const FormSpecification = createSelector(
    form.getForm,
    element.getSpecificationNodes,
    (formular, nodes) => [<SpecNode>{
        Id: 0,
        Parent: null,
        label: formular.Name.substr(0, 15),
        expanded: true,
        expandedIcon: 'far fa-file-alt',
        collapsedIcon: 'fas fa-file-alt',
        children: nodes
    }]
);

export const SelectedElement = createSelector(
    element.getElementEntities,
    element.getSelected,
    (entities, selectedId) => {
        return selectedId && <SpecificationElement>{
            ...entities[selectedId],
            Parent: (!!entities[selectedId].ParentId) ? <SpecElement>{ 
                Id: entities[selectedId].ParentId,
                Label: entities[entities[selectedId].ParentId].Label,
                Icon: ControlConfig[entities[selectedId].Type].Icon } : null,
            Rows: (!!entities[selectedId].Children) ? entities[selectedId].Children.map(childId => <SpecElement>{ 
                Id: childId,
                Label: entities[childId].Label,
                Icon: ControlConfig[entities[childId].Type].Icon
            }) : null,
        };
    }
);

export const FormForModelling = createSelector(
    form.getForm,
    element.getModelTree,
    (formular, tree) => <ModelForm>{
        ...formular,
        Pages: tree
    }    
);
