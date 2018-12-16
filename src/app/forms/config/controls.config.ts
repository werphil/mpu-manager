import { ElementTypes } from '../models/interfaces';

interface ControlConfigType {
    Name: string;
    Icon: string;
}

export const ControlConfig: { [P in ElementTypes]: ControlConfigType } = {
    AdressSuche: {
        Name: 'Adresssuche',
        Icon: ''
    },
    BoundGroup: {
        Name: 'Zweispaltiges Layout',
        Icon: ''
    },
    CheckBox: {
        Name: 'Checkbox',
        Icon: ''
    },
    Custom: {
        Name: 'Benutzerdefiniert',
        Icon: ''
    },
    DatePicker: {
        Name: 'Datum',
        Icon: ''
    },
    DropDown: {
        Name: 'Dropdown',
        Icon: ''
    },
    FormPage: {
        Name: 'Formularseite',
        Icon: 'fas fa-columns'
    },
    Group: {
        Name: 'Gruppe',
        Icon: 'fas fa-th-large'
    },
    InputText: {
        Name: 'Texteingabe',
        Icon: 'fas fa-i-cursor'
    },
    Output: {
        Name: 'Ausgabefeld',
        Icon: ''
    },
    RadioButton: {
        Name: 'Optionsfeld',
        Icon: ''
    },
    RichText: {
        Name: 'Textanzeige',
        Icon: 'fas fa-font'
    },
    Upload: {
        Name: 'Dateiupload',
        Icon: ''
    }
};

