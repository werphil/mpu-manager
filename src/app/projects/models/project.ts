import { ProjectListForm, FileForm } from './forms';
/**
 * Definitionen für ein Projekt
 * Schema für liste.txt (json)
 */

// DataModel
// ----------------------------------------------------------------

export interface Project {
    Id: number; // ID des Projektes
    Name: string; // Name des Projektes
}

// FileModel
// ----------------------------------------------------------------
export interface FileProject extends Project {
    Forms: FileForm[];
}

// ViewModels
// ----------------------------------------------------------------

// ViewModel default
export interface ProjectListProject extends Project {
    Forms: ProjectListForm[]; // Enthaltene Formulare im Projekt
}
