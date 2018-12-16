import { FileProject } from './project';

export interface ExplorerNextIds {
    NextFormId: number;
    NextProjectId: number;
}

// DataModel
// ----------------------------------------------------------------
export interface Explorer extends ExplorerNextIds {
    Projects: number[];
}

// FileModel
// ----------------------------------------------------------------
export interface ExplorerFile extends ExplorerNextIds {
    Projects: FileProject[];
}

// ViewModel
// ----------------------------------------------------------------

