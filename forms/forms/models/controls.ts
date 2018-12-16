import { XControl } from './controls';

import { Validation, ValidationType, PatternChip } from './../config/validation';

import { ControlType, ElementWidth, RepeatOption } from './../config/controlconfig';

/**
 * Klassen aller Formelemente und Controls
 * 
 */




// INTERFACES
/////////////////////////////////////////////////

// Struktur der Formular-Metadaten
export interface FormMeta {
  id: number;
  pcounter: number; // ID-Counter für Seiten
  ecounter: number; // ID-Counter für Elemente
  version: number;
  time: number;
  
}

/**
 * zum Verwalten von Anzeigebedingungen
 */
export interface ViewCondition {
  id: number; // ID des Bezugselements
  operator: string; // = > < !=
  value: string; // Wert, welchen das Bezugselement haben muss
  mode: string; // 'und' || 'oder'
  position: number; // Prio der Bedingung in der Liste (muss sein: index + 1)
}


/**
 * Für die Anzeige von Listen von Elementen für selects
 */
export interface ElementList {
  label: string;
  id?: number;
  values?: string[];
  elements?: ElementList[];
}

/**
 * Jedes Element im Grid muss XControl implementieren
 */
export interface XControl {
  id: number;
  path: string;
  position: number;
  width: number;
  typ: ControlType;
  conditions: ViewCondition[];
  hide?: boolean;
  notes: string;
  isElement: boolean;

  istPflicht?: boolean;
  info?: string;
  error?: string;
  label?: string;
  werte?: string[];
  repeat?: RepeatOption;
  rows?: XControl[];
  prefill?: string;
  validation?: Validation;
  validationNote?: string;

  value?: string;
  linkedID?: number;

  addElement?(element: XControl): void;
}

// Control hat eine Werteliste (Auswahlliste)
interface HasValues {
  werte: string[];
}
// Control kann ein Wiederholungsblock werden
interface Repeatable {
  repeat: RepeatOption;
}
// Control kann Validierungen enthalten
interface Validatable {
  validation: Validation;
  validationNote: string;
}

// Control kann vorbefüllt werden
interface Prefillable {
  prefill: string;
}

// BASISKLASSEN von Elementen
/////////////////////////////////////////////////



/**
 * Basisklasse für alle Formularelemente
 */
export abstract class FormElement implements XControl {
  id: number;
  label: string;
  width: number;
  typ: ControlType;
  position: number;
  conditions: ViewCondition[];
  hide: boolean;
  info: string;
  notes: string;
  path: string;


  // für DropScopes
  isElement: boolean;
  
  constructor() {
    this.conditions = new Array<ViewCondition>();
    this.isElement = true;
    this.notes = '';
    this.hide = false;
  }
  
}

/**
 * Basisklasse für Steuerelemente (mit Eingabemöglichkeit)
 */
export abstract class Control extends FormElement {
  
  istPflicht: boolean;
  label: string;
  error: string;
  value: string;

  constructor() {
    super();
    this.value = '';
  }
}

/**
 * Basisklasse für Formulargruppen
 */
export abstract class FormGrid {
  rows: XControl[];
  id: number;
  position: number;
  conditions: ViewCondition[];
  path: string;
  hide: boolean;

  constructor() {
    this.rows = new Array<XControl>();
    this.conditions = new Array<ViewCondition>();
    this.hide = false;
  }

  public addElement(element: XControl): void {
    
    const l = (element.rows) ? 'g' : 'e';
    element.path = this.path + '/' + l + element.id;



    // Neue Zeile/Spalte
    if (element.position <= this.rows.length) {
      // Neues Element dazwischen

      const startIndex = element.position - 1;
      this.rows.splice(startIndex, 0, element);
      this.repositionElements(startIndex);
      
    } else {
      // Neues Element am Ende
      this.rows.push(element);
    }  

  }

  private repositionElements(startIndex) {
    // x-Position aller Elemente darunter verschieben
    for (let i = startIndex; i < this.rows.length; i++) {
      this.rows[i].position = (i + 1);      
    }
  }
  /*
  private sortElements(startIndex?): void {
    const init = startIndex || 0;
    for (let i = init; i < this.rows.length; i++) {
        for (let j = 0; j < this.rows.length - 1; j++) {
            if (this.rows[j].position > this.rows[j + 1].position) {
                const swap = this.rows[j];
                this.rows[j] = this.rows[j + 1];
                this.rows[j + 1] = swap;
            }
        }
    }
  } */
  
  /**
   * Löscht ein Element aus dem Grid
   * @param el Das zu löschende Element
   */
  public removeElement(el: XControl): void {
    this.rows.splice((el.position - 1), 1);
    this.repositionElements(el.position - 1);
  }
}

// GRUPPEN
/////////////////////////////////////////////////

/**
 * Gruppen-Control
 */
export abstract class GroupControl extends FormGrid implements XControl {
  width: number;
  typ: ControlType;
  info: string;
  notes: string;
  isElement: boolean;

  constructor() {
    super();
    this.isElement = true;
    this.width = ElementWidth.doppelt;
    this.notes = '';
  }
}

/**
 * Gruppe (Überschrift)
 */
export class FormGroup extends GroupControl implements Repeatable, XControl {

  repeat: RepeatOption;
  label: string;

  constructor(label?: string) {
    super();
    this.label = label || 'Neue Gruppe';
    this.typ = ControlType.Group;
    this.repeat = RepeatOption.None;
  }

}
/**
 * Gebundene Tabelle (Zweispaltiges Layout)
 */
export class BoundGroup extends GroupControl implements XControl {
  

  constructor() {
    super();
    this.typ = ControlType.BoundGroup;
  }

}

// RICHTEXT
/////////////////////////////////////////////////

/**
 * Richtext
 */
export class RichText extends FormElement implements XControl, Repeatable {

  repeat: RepeatOption;

  constructor(html?: string) {
    super();
    this.label = html || 'Neues Texfeld';
    this.typ = ControlType.Richtext;
    this.width = ElementWidth.doppelt;
    this.repeat = RepeatOption.None;
  }

  // todo: HTML-Parser

}

// CONTROLS
/////////////////////////////////////////////////



/**
 * InputText <input type="text" />
 */
export class InputText extends Control implements Repeatable, Validatable, Prefillable, XControl {
  
  validation: Validation;
  validationNote: string;
  repeat: RepeatOption;
  prefill: string;
  
  constructor(labelText?: string) {
    super();
    this.label = labelText || 'Neues Eingabefeld';
    this.typ = ControlType.InputText;
    this.width = ElementWidth.normal;
    this.prefill = null;
    this.validation = {
      typ: ValidationType.None,
      min: 0,
      max: 0,
      komma: 0,
      custom: new Array<PatternChip>(),
      regex: ''
    };
    this.repeat = RepeatOption.None;
  }
}

/**
 * Output <input type="text"readonly />
 */
export class Output extends Control implements Repeatable, Validatable, XControl {
  
  validation: Validation;
  validationNote: string;
  repeat: RepeatOption;
  linkedID: number;
  
  constructor(labelText?: string) {
    super();
    this.label = labelText || 'Neues Ausgabefeld';
    this.typ = ControlType.Output;
    this.width = ElementWidth.normal;
    this.validation = {
      typ: ValidationType.None,
      min: 0,
      max: 0,
      komma: 0,
      custom: new Array<PatternChip>(),
      regex: ''
    };
    this.repeat = RepeatOption.None;
    this.linkedID = null;
  }
}

/**
 * RadioButton <input type="radio" />
 */
export class RadioButton extends Control implements HasValues, Repeatable, XControl {
    public werte: string[];
    public repeat: RepeatOption;
  
    constructor(labelText?: string) {
      super();
      this.label = labelText || 'Neuer Radiobutton';
      this.typ = ControlType.Radiobutton;
      this.width = ElementWidth.normal;
      this.repeat = RepeatOption.None;
      this.werte = new Array();
      this.repeat = RepeatOption.None;
    }
    
}

/**
 * Checkbox <input type="checkbox" />
 */
export class CheckBox extends Control implements HasValues, Repeatable, XControl {
  public werte: string[];
  public repeat: RepeatOption;

  constructor(labelText?: string) {
    super();
    this.label = labelText || 'Neue Checkbox';
    this.typ = ControlType.Checkbox;
    this.width = ElementWidth.normal;
    this.repeat = RepeatOption.None;
    this.werte = new Array();
    this.repeat = RepeatOption.None;
  }
  
}

/**
 * Dropdown <select>
 */
export class DropDown extends Control implements HasValues, Repeatable, XControl {
  public werte: string[];
  public repeat: RepeatOption;

  constructor(labelText?: string) {
    super();
    this.label = labelText || 'Neues Dropdown';
    this.typ = ControlType.Dropdown;
    this.width = ElementWidth.normal;
    this.repeat = RepeatOption.None;
    this.werte = new Array();
    this.repeat = RepeatOption.None;
  }
  
}

/**
 * DatePicker <input type="date" />
 */
export class DatePicker extends Control implements Repeatable, Prefillable, XControl {
  
  prefill: string;
  repeat: RepeatOption;
  
  constructor(labelText?: string) {
    super();
    this.label = labelText || 'Neues Datumsfeld';
    this.typ = ControlType.Datepicker;
    this.width = ElementWidth.normal;
    this.repeat = RepeatOption.None;
    this.prefill = null;
  }
}

/**
 * DatePicker <input type="date" />
 */
export class Upload extends Control implements Repeatable, XControl {
  

  repeat: RepeatOption;
  
  constructor(labelText?: string) {
    super();
    this.label = labelText || 'Neuer Upload';
    this.typ = ControlType.Upload;
    this.width = ElementWidth.normal;
    this.repeat = RepeatOption.None;
  }
}


// FORMULAR
/////////////////////////////////////////////////

/**
 * Formularseiten
 */
export class FormPage extends FormGrid {
  public name: string; // Name der Seite
  
  constructor(nameOrData: any, id?: number) {
    super();
    if (typeof nameOrData === 'string' || nameOrData instanceof String) {
      this.name = nameOrData.toString();
      this.id = id;
      this.path = 'p' + this.id;
      this.rows = [];
    } else {
      this.name = nameOrData.name;
      this.id = nameOrData.id;
      this.position = nameOrData.position;
      this.rows = [];
      this.path = 'p' + this.id;

      for (const el of nameOrData.rows) {
        this.rows.push(this.makeElements(el));
      }
    }

    
  }

  private makeElements(el) {

    if (el.rows) {
      // Nur bei Controls mit Funktionen (FormGrids mit addElement etc) ist eine Instanziierung nötig
      const control = ControlFactory.createElement(el.typ);
      Object.assign(control, el);

      control.rows = [];

      // rekursive Funktion für Gruppen
      for (const e of el.rows) {
        control.rows.push(this.makeElements(e));
      }

      return control;
    } 
    
    return el;
  }
  
}

export class Formular {

  public metadata: FormMeta;
  public name: string;
  public pages: FormPage[];
  public umschlag: string;
  
  constructor(data?: Formular) {

    if (data) {
      this.metadata = data.metadata;
      this.name = data.name;
      this.umschlag = data.umschlag;
      this.pages = new Array();

      for (const page of data.pages) {
        this.pages.push(new FormPage(page));
      }

    } else {
      this.pages = new Array();
      this.name = 'Neues Formular';
      this.metadata = {
        pcounter: 1,
        ecounter: 1,
        id: 0,
        version: 0,
        time: Date.now()
      };
    }
  }
  
  public makePage(name: string, id: number): void {
    this.pages.push(new FormPage(name, id));
  }
  
}




/**
 * Erstellt dynamisch eine neue Instanz eines Formularelements
 */
export class ControlFactory {
  /**
   * 
   * @param typ Typ laut ControlType @link '../../config/controlconfig.ts'
   * @param data Zusätzliche Informationen für die Instanzierung
   */
  public static createElement(typ: ControlType, data?: any): XControl {

    switch (typ) {
      case ControlType.InputText:
        return new InputText();
      case ControlType.Radiobutton:
        return new RadioButton();
      case ControlType.Checkbox:
        return new CheckBox();
      case ControlType.Dropdown:
        return new DropDown();
      case ControlType.Group:
        return new FormGroup();
      case ControlType.BoundGroup:
        return new BoundGroup();
      case ControlType.Datepicker:
        return new DatePicker();
      case ControlType.Upload:
        return new Upload();
      case ControlType.Output:
        return new Output();
      case ControlType.Richtext:
        return new RichText();
      default:
        return new InputText();

    }
  }
}
  

