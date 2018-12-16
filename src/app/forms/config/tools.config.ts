import { ElementTypes } from '../models/interfaces';

export interface ToolCategory {
    Name: string;
    Items: ElementTypes[];
    Icon?: string;
}

export const ToolConfig: ToolCategory[] = [
    {
        Name: 'Layout',
        Items: ['Group', 'BoundGroup']
    },
    {
        Name: 'Eingabe',
        Items: ['InputText', 'DatePicker']
    },
    {
        Name: 'Auswahl',
        Items: ['RadioButton', 'CheckBox', 'DropDown']
    },
    {
        Name: 'Ausgabe',
        Items: ['RichText', 'Output']
    }
];
