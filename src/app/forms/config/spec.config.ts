import { SpecificationElement } from './../models/element';

export type SpecItemType = keyof SpecificationElement;

export interface SpecificationConfig {
    Icon: string;
    Name: string;
    CanCopy?: boolean;
}

export interface SpecCategory {
    Name: string;
    Items: SpecItemType[];
}

export const SpecItemCfg:  { [P in SpecItemType]: SpecificationConfig } = {
    Id: {
        Icon: 'fas fa-id-badge',
        Name: 'Globale ID'
    },
    Label: {
        Icon: 'fas fa-font',
        Name: 'Label',
        CanCopy: true
    },
    Type: {
        Icon: 'fas fa-question',
        Name: 'Element-Typ'
    },
    Position: {
        Icon: 'fas fa-sort-numeric-down',
        Name: 'Position (im Parent)'
    },
    Infotext: {
        Icon: 'fas fa-info-circle',
        Name: 'Infotext'
    },
    Errortext: {
        Icon: 'fas fa-exclamation-circle',
        Name: 'Fehlertext'
    },
    Hidden: {
        Icon: 'fas fa-eye',
        Name: 'Anzeigen?'
    },
    Notes: {
        Icon: 'fas fa-sticky-note',
        Name: 'Anmerkungen'
    },
    Repeat: {
        Icon: 'fas fa-redo-alt',
        Name: 'Wiederholung'
    },
    Conditions: {
        Icon: 'fas fa-eye',
        Name: 'Anzeigebedingungen'
    },
    Prefill: {
        Icon: 'fas fa-share',
        Name: 'Vorbefüllung'
    },
    Validation: {
        Icon: 'fas fa-tasks',
        Name: 'Validierung'
    },
    Options: {
        Icon: 'fas fa-list-ol',
        Name: 'Werteliste'
    },
    Rows: {
        Icon: 'fas fa-child',
        Name: 'Enthaltene Elemente'
    },
    Width: {
        Icon: 'fas fa-arrows-alt-h',
        Name: 'Breite'
    },
    ParentId: {
        Icon: '',
        Name: ''
    },
    Parent: {
        Icon: 'fas fa-user-alt',
        Name: 'Parent-Element'
    },
    LinkedId: {
        Icon: 'fas fa-link',
        Name: 'Verknüpftes Element'
    },
    MultiLine: {
        Icon: '',
        Name: 'Mehrzeilig'
    },
    Mandatory: {
        Icon: 'fas fa-star',
        Name: 'Pflichtfeld?'
    }
};

export const SpecConfig: SpecCategory[] = [
    {
        Name: 'Allgemein',
        Items: ['Id', 'Label', 'Type', 'Mandatory', 'Notes']
    },
    {
        Name: 'Layout',
        Items: ['Parent', 'Position', 'Width', 'Rows']
    },
    {
        Name: 'Anzeige',
        Items: ['Hidden', 'Conditions', 'MultiLine', 'Repeat']
    },
    {
        Name: 'Werte',
        Items: ['Options', 'Validation', 'Prefill', 'LinkedId']
    },
    {
        Name: 'Sonstiges',
        Items: ['Infotext', 'Errortext']
    }
];
