
import { TreeNode } from 'primeng/api';

export type DeploymentStage = 'N' | 'T' | 'Q' |'P';

// Basic
export interface BasicFormData {
    Id: number; // Id des Formulars
    Name: string; // Name des Formulars (Arbeitstitel)
    DeployedVersions: Deployments; // aktuell sich auf den Systemen befindlichen Versionen
}

interface FormVersion {
    Number: number;
    Notes?: string; // Anmerkungen zu dieser Version
}

export interface VersionDetails extends FormVersion {
    LastEdit?: Date;
    LastEditBy?: string;
    CreationDate?: Date;
    CreatedBy?: string;
}

export interface MajorVersion extends VersionDetails {
    MinorVersions: VersionDetails[]; // Minor-Versionen zu dieser Hauptversion
}

// DataModel
// ----------------------------------------------------------------

export interface Form extends BasicFormData {
    ProjectId: number;
    Versions: MajorVersion[];
}

export interface Deployments {
    SystemT: VersionInfo; // Aktuelle Major/Minor Version auf T
    SystemQ: VersionInfo; // Aktuelle Major/Minor Version auf Q
    SystemP: VersionInfo; // Aktuelle Major/Minor Version auf P
}

export interface VersionInfo {
    MajorVersion: number;
    MinorVersion: number;
}

// FileModel
// ----------------------------------------------------------------
export interface FileForm extends BasicFormData {
    MajorVersions: FileMajorVersion[];
}

export interface FileMajorVersion extends FormVersion {
    MinorVersions: FormVersion[];
}



// ViewModels
// ----------------------------------------------------------------

// Für Projektübersicht
export interface ProjectListForm {
    Id: number; // Id des Formulars
    Name: string; // Name des Formulars (Arbeitstitel)
    Stage: string;
    StageVersion: VersionInfo;
    LatestVersion: VersionInfo;
}

export interface NewForm {
    Name: string;
    ProjectId: number;
}

// Für Formularansicht
export interface ViewForm extends BasicFormData {
    ProjectId: number;
    ProjectName: string;
    LatestVersion: VersionInfo;
    AllVersions: VersionTreeNode[];
}

export interface VersionTreeNode extends TreeNode, VersionDetails {}



// Für Versionsauswahl?
