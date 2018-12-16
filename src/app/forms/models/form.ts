import { FormPage, SpecNode } from './element';

export interface FormLoadInfo {
    Id: number; // FormId
    Branch: number; // Major
    Version: number; // Minor
}


// DataModel
// ----------------------------------------------------------------

export interface FormModel {
    Name: string;   // IVP-Titel
    Logo: string;
    Envelope: string; // Umschlagtext
    Transmission: TransmissionType;
    NextId: NextIds; // AutoIncrement
}

export interface TransmissionType {
    Type: 'Lokales Speichern' | 'E-Mail' | 'WebService';
    Receiver: string;
}

export interface NextIds {
    Page: number;
    Element: number;
}

// FileModel
// ----------------------------------------------------------------

export interface FormFile extends FormModel {
    Pages: FormPage[];
}

// ViewModels
// ----------------------------------------------------------------
export interface FormSpec {
    Nodes: SpecNode[];
}

export interface ModelForm extends FormModel {
    Pages: FormPage[];
}

