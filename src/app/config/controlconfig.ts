/**
 * Konfigurationen für Steuerelemente (controls)
 * welche gibt es? Optionen für Steuerelemente
 * 
 * HowTo: Neuen Controltyp hinzufügen
 */

// Werte rechts müssen den Werten in ToolConfig (tools.ts) entsprechen!
export enum ControlType {
  InputText = 'InputText',
  Radiobutton = 'RadioButton',
  Richtext = 'RichText',
  Datepicker = 'DatePicker',
  Dropdown = 'DropDown',
  Checkbox = 'CheckBox',
  Group = 'Group',
  BoundGroup = 'BoundGroup',
  Upload = 'Upload',
  AdressSuche = 'AdressSuche',
  Custom = 'Custom',
  Output = 'Output'
}

// Optionen für Wiederholungstabellen
export enum RepeatOption {
  None = 'keine', // keine Wiederholung (default)
  Table = 'Tabelle', // als Tabelle
  Subform = 'Subformular' // als Unterformular
}

// Breite von Elementen im Raster - gehört noch verfeinert!
export enum ElementWidth {
  normal = 50, // 1 Spalte
  doppelt = 100, // 2 Spalten
  halb = 25 // eine halbe Spalte
}


export interface ControlProperty {
  name: string; // wird in Toolbox angezeigt
  typ: ControlType; // laut Liste
  icon: string; // FontAwesome Referenz, beginnend mit fa. z.B. 'fa-i-cursor'. 
  klasse: string; // Welche CSS-Klasse hat das Element in der Voransicht. Muss ein Wert aus @link form-element.component.css sein.
  width: number;
  tools: {
    label: boolean;
    mandatory: boolean;
    values: boolean;
    validation: boolean;
    repeat: boolean;
    resize: boolean;
    richtext: boolean;
    info: boolean;
    error: boolean;
    prefill: boolean;
    condition: boolean;
    link?: boolean;
  };
  prefillFormat?: {
    showRegister: boolean,
    text: string
  };
}

export interface DefaultValue {
  name: string;
  values: string[];
}

/**
 * Verwaltet die Eigenschaften der Controls
 */
export const ControlConfig = {
  InputText: {
    name: 'Eingabefeld',
    typ: ControlType.InputText,
    icon: 'fa-i-cursor',
    klasse: 'input-text',
    width: ElementWidth.normal,
    tools: {
      label: true,
      mandatory: true,
      values: false,
      validation: true,
      repeat: true,
      resize: true,
      richtext: false,
      info: true,
      error: true,
      prefill: true,
      condition: true
    },
    prefillFormat: {
      showRegister: true,
      text: 'Vorbefüllt aus '
    }
  },
  RadioButton: {
    name: 'Radiobutton',
    typ: ControlType.Radiobutton,
    icon: 'fa-dot-circle',
    klasse: 'auswahlliste',
    width: ElementWidth.normal,
    tools: {
      label: true,
      mandatory: true,
      values: true,
      validation: false,
      repeat: true,
      resize: false,
      richtext: false,
      info: true,
      error: true,
      prefill: false,
      condition: true
    }
  },
  RichText: {
    name: 'Textfeld',
    typ: ControlType.Richtext,
    icon: 'fa-font',
    klasse: 'richtext',
    width: ElementWidth.doppelt,
    tools: {
      label: false,
      mandatory: false,
      values: false,
      validation: false,
      repeat: true,
      resize: false,
      richtext: true,
      info: false,
      error: false,
      prefill: false,
      condition: true
    }
  },
  DatePicker: {
    name: 'Datumseingabe',
    typ: ControlType.Datepicker,
    icon: 'fa-calendar-alt',
    klasse: 'input-text',
    width: ElementWidth.normal,
    tools: {
      label: true,
      mandatory: true,
      values: false,
      validation: false, // aktuell keine Datumsvalidierungen
      repeat: true,
      resize: false,
      richtext: false,
      info: true,
      error: true,
      prefill: true,
      condition: true
    },
    prefillFormat: {
      showRegister: false,
      text: '08.06.2018'
    }
  },
  DropDown: {
    name: 'Auswahlliste',
    typ: ControlType.Dropdown,
    icon: 'fa-caret-square-down',
    klasse: 'dropdown',
    width: ElementWidth.normal,
    tools: {
      label: true,
      mandatory: true,
      values: true,
      validation: false,
      repeat: true,
      resize: false,
      richtext: false,
      info: true,
      error: true,
      prefill: false,
      condition: true
    }
  },
  CheckBox: {
    name: 'Checkbox',
    typ: ControlType.Checkbox,
    icon: 'fa-check-square',
    klasse: 'auswahlliste',
    width: ElementWidth.normal,
    tools: {
      label: true,
      mandatory: true,
      values: true,
      validation: false,
      repeat: true,
      resize: false,
      richtext: false,
      info: true,
      error: true,
      prefill: false,
      condition: true
    }
  },
  Group: {
    name: 'Gruppe',
    typ: ControlType.Group,
    icon: 'fa-window-maximize',
    klasse: 'gruppe',
    width: ElementWidth.doppelt,
    tools: {
      label: true,
      mandatory: false,
      values: false,
      validation: false,
      repeat: true,
      resize: false,
      richtext: false,
      info: true,
      error: false,
      prefill: false,
      condition: true
    }
  },
  BoundGroup: {
    name: 'Gruppe',
    typ: ControlType.BoundGroup,
    icon: 'fa-window-maximize',
    klasse: 'gruppe',
    width: ElementWidth.doppelt,
    tools: {
      label: false,
      mandatory: false,
      values: false,
      validation: false,
      repeat: false,
      resize: false,
      richtext: false,
      info: false,
      error: false,
      prefill: false,
      condition: false
    }
  },
  Upload: {
    name: 'Dateiupload',
    typ: ControlType.Upload,
    icon: 'fa-upload',
    klasse: 'input-text',
    width: ElementWidth.normal,
    tools: {
      label: true,
      mandatory: true,
      values: false,
      validation: false,
      repeat: true,
      resize: false,
      richtext: false,
      info: true,
      error: true,
      prefill: false,
      condition: true
    }
  },
  AdressSuche: {
    name: 'Adresssuche',
    typ: ControlType.AdressSuche,
    icon: 'fa-map-marker-alt',
    klasse: '',
    width: ElementWidth.normal,
    tools: null
  },
  Custom: {
    name: 'Benutzerdefiniert',
    typ: ControlType.Custom,
    icon: 'fa-question-circle',
    klasse: '',
    width: ElementWidth.normal,
    tools: null
  },
  Output: {
    name: 'Ausgabefeld',
    typ: ControlType.Output,
    icon: 'fa-sign-out-alt',
    klasse: 'input-text-disabled',
    width: ElementWidth.normal,
    tools: {
      label: true,
      mandatory: true,
      values: false,
      validation: true,
      repeat: true,
      resize: true,
      richtext: false,
      info: true,
      error: true,
      prefill: false,
      condition: true,
      link: true
    }
  }
};


/**
 * Tools, die in der Werkzeugleiste angezeigt werden sollen
 */
export const Tools: ControlProperty[] = [
  ControlConfig.Group,
  ControlConfig.RichText,
  ControlConfig.InputText,
  ControlConfig.RadioButton,
  ControlConfig.CheckBox,
  ControlConfig.DropDown,
  ControlConfig.DatePicker,
  ControlConfig.Upload,
  ControlConfig.Output
];
