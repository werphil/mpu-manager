import { FileForm, ProjectListForm, ViewForm } from './../models/forms';
import { ExplorerFile } from '../../projects/models/manager';

import { FileProject, ProjectListProject } from './../models/project';
import { createSelector } from '@ngrx/store';


import * as manager from './manager.select';
import * as project from './projects.select';
import * as forms from './forms.select';



/**
 * PROJEKT EXPLORER
 */
export const ProjectsLoaded = manager.getLoaded;
export const ProjectsLoading = manager.getLoading;
export const NextIds = manager.getNextIds;

/**
 * MACHT AUS DEM DATAMODEL DAS FILEMODEL
 */
export const ExplorerFileData = createSelector(
    project.getProjectEntities,
    manager.getIds,
    manager.getNextIds,
    forms.getAllForms,
    (projects, projectids, nextids, formulare) => <ExplorerFile>{
        NextFormId: nextids.NextFormId,
        NextProjectId: nextids.NextProjectId,
        Projects: projectids.map(id => <FileProject>{
            Id: id,
            Name: projects[id].Name || '',
            Forms: formulare.filter(formular => formular.ProjectId === id).map(
                formular => <FileForm>{
                    Id: formular.Id,
                    Name: formular.Name,
                    DeployedVersions: formular.DeployedVersions,
                    MajorVersions: formular.Versions
                }
            )
        })
    }
);

/**
 * ViewModel für die Projektliste (project-home)
 */
export const ProjectList = createSelector(
    project.getProjectEntities,
    manager.getIds,
    forms.getAllForms,
    (projects, projectids, formulare) => projectids
        .map(id => <ProjectListProject>{
                Id: id,
                Name: projects[id].Name || '',
                Forms: formulare.filter(formular => formular.ProjectId === id)
                    .map(formular => {
                        const stage = forms.getHighestStage(formular);

                        return <ProjectListForm>{
                            Id: formular.Id,
                            Name: formular.Name,
                            Stage: (stage !== 'N') ? stage : null,
                            StageVersion: (stage !== 'N') ? formular.DeployedVersions['System' + stage] : null,
                            LatestVersion: forms.getLatestVersion(formular)
                        };
                    })

        })
);


/**
 * ViewModel für form-home (Formularansicht)
 */
export const SelectedForm = createSelector(
    project.getProjectEntities,
    forms.getSelectedForm,
    (projects, form) => <ViewForm>{
        ...form,
        ProjectName: projects[form.ProjectId].Name,
        LatestVersion: forms.getLatestVersion(form),
        AllVersions: forms.getVersionTree(form),
    }
);

export const SelectFormById = (id: number) => createSelector(
    project.getProjectEntities,
    forms.getFormById(id),
    (projects, form) => <ViewForm>{
        ...form,
        ProjectName: projects[form.ProjectId].Name,
        LatestVersion: forms.getLatestVersion(form),
        AllVersions: forms.getVersionTree(form),
    }
);
