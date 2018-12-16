import { VersionTreeNode, Form, DeploymentStage, VersionInfo } from './../models/forms';
import { getState } from './manager.select';
import { createSelector } from '@ngrx/store';
import * as fromForms from '../reducers/forms.reducer';

const getEntityState = createSelector(
    getState,
    state => state.forms
);

export const {
    selectIds: getIds,
    selectEntities: getFormEntities,
    selectAll: getAllForms
} = fromForms.adapter.getSelectors(getEntityState);

const getSelectedId = createSelector(
    getEntityState,
    fromForms.getSelectedId
);

export const getSelectedForm = createSelector(
    getFormEntities,
    getSelectedId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    }
);

export const getFormById = (id: number) => createSelector(
    getFormEntities,
    (entities) => {
        return id && entities[id];
    }
);

/**
 * HELPER FUNCTIONS
 */

export function getLatestVersion(form: Form): VersionInfo {
    const major = form.Versions[form.Versions.length - 1];
    return {
        MajorVersion: major.Number,
        MinorVersion: major.MinorVersions[major.MinorVersions.length - 1].Number
    };
}

export function getHighestStage(form: Form): DeploymentStage {
    const isOn = form.DeployedVersions;
    if (!!isOn.SystemP) {
        return 'P';
    } else if (!!isOn.SystemQ) {
        return 'Q';
    } else if (!!isOn.SystemT) {
        return 'T';
    } else {
        return 'N';
    }
}

export function getVersionTree(form: Form): VersionTreeNode[] {
    const latestVersion = getLatestVersion(form);

    return form.Versions.map(version => {
        // Mapping von MajorVersion auf TreeView
        const major = version.Number;

        return <VersionTreeNode>{
            ...getVersionDetails(version),
            Number: major,
            label: 'Branch ' + major.toString(),
            expanded: (version.Number === latestVersion.MajorVersion),
            expandedIcon: 'fas fa-folder-open',
            collapsedIcon: 'fas fa-folder',
            selectable: false,
            children: version.MinorVersions.map(minor => {
                const minorString = major + '.' + minor.Number.toString();

                return <VersionTreeNode>{
                    ...getVersionDetails(minor),
                    Number: minor.Number,
                    data: major, // Data hält die Versionsnummer des MajorBranches
                    label: 'Version ' + minorString,
                    collapsedIcon: 'fas fa-code-branch',
                };
            })
        };
    });
}

function getVersionDetails(version: any): any {
    return {
        CreatedBy: version.CreatedBy,
        CreationDate: version.CreationDate,
        LastEdit: version.LastEdit,
        LastEditBy: version.LastEditBy
    };
}
