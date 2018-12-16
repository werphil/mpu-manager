
export type ElementTypes =
| 'FormPage'
| 'InputText'
| 'RadioButton'
| 'RichText'
| 'DatePicker'
| 'DropDown'
| 'CheckBox'
| 'Group'
| 'BoundGroup'
| 'Upload'
| 'AdressSuche'
| 'Custom'
| 'Output';

export type RepeatOption =  'none' | 'table' | 'form';
export type PatternType =   'letter' | 'number' | 'or' | 'whitespace' | 'all';
export type RangeType =     'none' | 'letters' | 'numbers';
export type PatternOptionType = 'alle' | 'genau' | 'zwischen';

export enum ValidationType {
    None = 'None', // alle Werte sind gültig
    Int = 'Integer', // nur Ganze Zahlen
    Decimal = 'Decimal', // nur Dezimalzahlen
    Text = 'Text',
    Email = 'Email',
    SVNr = 'SVNr',
    FBNr = 'FBNr',
    Custom = 'Custom',
    Regex = 'Regex'
}


// Jedes Element im Formular (Seite oder Formularelement)
export interface BaseFormElement {
    Id: number; // Formularweite eindeutige Id
    Label: string;
    Hidden?: boolean; // Element anzeigen?
    Position: number; // Position (für ArraySort)
    Conditions?: ViewCondition[]; // Anzeigebedingungen
}

// Element innerhalb einer Formularseite
export interface BasePageElement extends BaseFormElement {
    Type: ElementTypes;
    Notes: string;
    ParentId: number;
}

export interface AbstractControl extends BasePageElement {
    Infotext: string;
    Errortext: string;
    Mandatory: boolean;
    Width: 25 | 50 | 75 | 100; // oder skaliert?
}

export interface FormGrid {
    Rows: FormElement[];
}

export interface OptionControl {
    Options: OptionItem[];
}

export interface RepeatableControl {
    Repeat: RepeatOption;
}

export interface PrefillableControl {
    Prefill: string;
}

export interface ValidatableControl {
    Validation: Validation;
}

export interface ViewCondition {
    LinkedId: number; // ID des Bezugselements
    Operator: '=' | '!=' | '>' | '<';
    Value: string; // Wert, welchen das Bezugselement haben muss
    Mode: 'und' | 'oder';
    Position: number; // Prio der Bedingung in der Liste (muss sein: index + 1)
}

export interface OptionItem {
    Key: string;
    Value: string;
}

export interface Validation {
    Type: ValidationType;
    Min: number;
    Max: number;
    Decimals: number;
    Custom: PatternChip[];
    Regex: string;
}

export interface PatternChip {
    ViewText: string;
    Type: PatternType;
    Optional?: boolean;
    Chars?: PatternOption;
    Count?: PatternOption;
}

export interface PatternOption {
    Type: PatternOptionType;
    MinValue: number | string;
    MaxValue?: number;
}

interface AllElement extends AbstractControl, RepeatableControl, PrefillableControl, ValidatableControl, OptionControl {
    LinkedId: number;
    MultiLine: boolean;
}


// DataModel
export type FormElementModel = Partial<AllElement>;

// ViewModel
interface AllElementWithGrid extends AllElement, FormGrid {}
export type FormElement = Partial<AllElementWithGrid>;






