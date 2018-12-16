import { isNumeric } from 'rxjs/util/isNumeric';
import { ValidatorFn, AbstractControl } from '@angular/forms';

/**
 * Konfigurationsfile für Feldvalidierungen
 */

/**
 * Arten von Validierungen
 */
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

export enum PatternType {
    Letter,
    Number,
    Or,
    Whitespace,
    All
}

export enum RangeType {
    None,
    Letters,
    Numbers
}

export enum OptionType {
    Alle,
    Genau,
    Zwischen
}

export interface ValidationSet {
    name: string;   // Name der im Dropdown angezeigt wird
    typ: ValidationType; // Art der Validierung
    minmax: boolean; // Soll ein Minimal- und Maximalwert möglich sein?
    kommastellen: boolean;
    pattern?: string;
}

export interface Validation {
    typ: ValidationType;
    min: number;
    max: number;
    komma: number;
    custom: PatternChip[];
    regex: string;
}

export interface PatternTool {
    name: string;
    type: PatternType;
    icon: string;
    menge: boolean;
    range: RangeType;
}

export interface PatternOption {
    art: OptionType;
    minValue: number | string;
    max?: number;
}

export interface PatternChip {
    viewText: string;
    type: PatternType;
    optional?: boolean;
    zeichen?: PatternOption;
    anzahl?: PatternOption;
}

/**
 * Werte für Anzeige in Validierungsdialog
 */
export const ValidationConfig = {
    None: {
        name: 'Keine Beschränkung',
        typ: ValidationType.None,
        minmax: false,
        kommastellen: false
    },
    Integer: {
        name: 'Nur ganze Zahl',
        typ: ValidationType.Int,
        minmax: true,
        kommastellen: false
    },
    Decimal: {
        name: 'Dezimalzahl / Geldbetrag',
        typ: ValidationType.Decimal,
        minmax: true,
        kommastellen: true
    },
    Text: {
        name: 'Text',
        typ: ValidationType.Text,
        minmax: true,
        kommastellen: false
    },
    Email: {
        name: 'E-Mail',
        typ: ValidationType.Email,
        minmax: false,
        kommastellen: false,
        pattern: 'Standard E-Mail-Pattern'
    },
    SVNr: {
        name: 'Sozialversicherungsnummer',
        typ: ValidationType.SVNr,
        minmax: false,
        kommastellen: false,
        pattern: '^[1-9]{1}[0-9]{3}(?:([012]{1}[0-9]{1})|30|31)(?:([01]{1}[0-9]{1}))\\d{2}$'
    },
    FBNr: {
        name: 'Firmenbuchnummer',
        typ: ValidationType.FBNr,
        minmax: false,
        kommastellen: false,
        pattern: '^[0-9]{6}[abdfghikmpstvwxyzABDFGHIKMPSTVWXYZ]{1}$'
    },
    Custom: {
        name: 'Benutzerdefiniert',
        typ: ValidationType.Custom,
        minmax: false,
        kommastellen: false
    },
    Regex: {
        name: 'Regulärer Ausdruck',
        typ: ValidationType.Regex,
        minmax: false,
        kommastellen: false
    }
};

export const Validierungen: ValidationSet[] = [
    ValidationConfig.None,
    ValidationConfig.Integer,
    ValidationConfig.Decimal,
    ValidationConfig.Text,
    ValidationConfig.Email,
    ValidationConfig.SVNr,
    ValidationConfig.FBNr,
    ValidationConfig.Custom,
    ValidationConfig.Regex
];


export const Patterns: PatternTool[] = [
    {
        name: 'Buchstabengruppe',
        type: PatternType.Letter,
        icon: 'font',
        menge: true,
        range: RangeType.Letters
    },
    {
        name: 'Zahlengruppe',
        type: PatternType.Number,
        icon: 'superscript',
        menge: true,
        range: RangeType.Numbers
    },
    {
        name: 'Oder',
        type: PatternType.Or,
        icon: 'sitemap',
        menge: false,
        range: RangeType.None
    },
    {
        name: 'Alle Zeichen',
        type: PatternType.All,
        icon: 'asterisk',
        menge: true,
        range: RangeType.None
    },
    {
        name: 'Leerzeichen',
        type: PatternType.Whitespace,
        icon: 'window-minimize',
        menge: true,
        range: RangeType.None
    },
];

export function mpuValidator(val: Validation): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      
      if (val.typ === ValidationType.None) {
        return null;
      }

      // Alle nicht-Regex-Typen

      if (val.typ === ValidationType.Int) {

        if (!isNumeric(control.value)) {
          return {'notnumeric': {value: control.value}};
        }

        if (Number(control.value) < val.min) {
          return {'ltmin': {value: control.value}};
        }
        if (Number(control.value) > val.max) {
          return {'gtmax': {value: control.value}};
        }

        return null;
      }



      let regex: string;

      switch (val.typ) {
        case ValidationType.Decimal:
          // Add min/max
          regex = '^[0-9]+,?[0-9]{' + val.komma + '}$';
        break;

        // todo dynamisch
        case ValidationType.FBNr:
        case ValidationType.SVNr:
        case ValidationType.Email:
          regex = ValidationConfig[val.typ].pattern;
        break;

        case ValidationType.Regex:
          regex = val.regex;
        break;

        case ValidationType.Custom:
          regex = chips2regex(val.custom);
        break;

        default:
          return null;
      }

      const expr = new RegExp(regex, 'mu');
      const check = expr.test(control.value);
      return check ? null : {'mpuValidator': {value: control.value}};
    };
}


export function chips2regex(chips: PatternChip[]): string {
    // TODO
    return  '^[A-Za-z]*$';
}
