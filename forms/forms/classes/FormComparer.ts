import { Formular, FormGrid, FormPage, XControl } from './../../classes/controls';

    
export enum DiffAction {
    copy = 'copy'
}

export enum DiffCategory {
    Form = 0,
    Page = 1,
    Element = 2
}

export enum Properties {
    label = 'label',
    name = 'name',
    istPflicht = 'istPflicht',
    position = 'position',
    width = 'width',
    conditions = 'conditions',
    notes = 'notes',
    info = 'info',
    error = 'error',
    werte = 'werte',
    repeat = 'repeat',
    prefill = 'prefill',
    validation = 'validation',
    linked = 'linked'
}

export enum DiffType {
    Name = 'Der Name',
    Umschlag = 'Der Umschlagstext',
    Formpage = 'Der Name der Seite',
    Label = 'Das Label',
    Condition = 'Eine Anzeigebedingung',
    Position = 'Die Position',
    Notes = 'Eine Anmerkung',
    Element = 'Das Element',
    Info = 'Der Infotext',
    Error = 'Der Fehlertext',
    Width = 'Die Breite',
    Pflichtfeld = 'Die Pflichtfeld-Eigenschaft',
    Validation = 'Die Validierung',
    Werte = 'Der Wertevorrat',
    Repeat = 'Das Wiederholungsverhalten',
    Linked = 'Die Verknüpfung',
    Prefill = 'Die Vorbefüllung'
}

const DiffCfg = {
    notes: {
        difftype: DiffType.Notes,
        action: null
    },
    info: {
        difftype: DiffType.Info,
        action: null
    },
    error: {
        difftype: DiffType.Error,
        action: null
    },
    label: {
        difftype: DiffType.Label,
        action: null
    },
    position: {
        difftype: DiffType.Position,
        action: null
    },
    width: {
        difftype: DiffType.Width,
        action: null
    },
    conditions: {
        difftype: DiffType.Condition,
        action: null
    },
    istPflicht: {
        difftype: DiffType.Pflichtfeld,
        action: null
    },
    werte: {
        difftype: DiffType.Werte,
        action: null
    },
    validation: {
        difftype: DiffType.Validation,
        action: null
    },
    repeat: {
        difftype: DiffType.Repeat,
        action: null
    },
    linkedID: {
        difftype: DiffType.Linked,
        action: null
    },
    prefill: {
        difftype: DiffType.Prefill,
        action: null
    },
    name: {
        difftype: DiffType.Formpage,
        action: null
    }
    
};


  
export enum Change {
    Added = 'hinzugefügt',
    Patched = 'geändert',
    Deleted = 'gelöscht'
  }
  
export interface Compare {
    id: number;
    tooltip: string;
    category: DiffCategory;
    mode: Change;
    typ: any;
    prop: Properties;
    from?: any;
    to: any;
    action: string;
    actionProperty?: string;
  }

export class FormComparer {
    // Es gilt: Was hat sich geändert von compare zu base?
    private base: Formular; // Das aktive Formular "to"
    private compare: Formular; // Das Vergleichsformular "from"
    private diffs: Compare[];

    constructor(base: Formular, compare: Formular) {
        this.base = base;
        this.compare = compare;
        this.diffs = new Array<Compare>();
    }

    getDifferences(): Compare[] {
        if (this.base === null || this.compare === null) {
            return [];
        }

        this.ofForm();
        this.ofPages();

        return this.diffs;
    }

    private add(id: number, tt: string, mode: Change, typ: any, to: any, prop?: Properties,
                cat?: DiffCategory, from?: any,  action?: string, actionprop?: string) {

        this.diffs.push({
            id: id,
            tooltip: tt,
            category: cat,
            mode: mode,
            typ: typ,
            prop: prop || null,
            from: from || null,  
            to: to,
            action: action || null,
            actionProperty: actionprop || null
        });
    }

    private getMode(base, comp, prop): Change {
        if ((!comp[prop] || comp[prop].length === 0) && base[prop] && base[prop].length > 0) {
            return Change.Added;
        } else if (comp[prop] && comp[prop].length > 0 && (!base[prop] || base[prop].length === 0)) {
            return Change.Deleted;
        } else if (comp[prop] !== base[prop]) {
            return Change.Patched;
        } else {
            return null;
        }
    }

    private ofForm() {
    
        if (this.compare.name !== this.base.name) {
            this.add(0, null, Change.Patched, DiffType.Name, this.base.name, null, 
                        DiffCategory.Form, this.compare.name, DiffAction.copy, 'name');
        }

        if ((!this.compare.umschlag || this.compare.umschlag.length === 0) && this.base.umschlag && this.base.umschlag.length > 0) {
            this.add(0, null, Change.Added,  DiffType.Umschlag, this.base.umschlag, null,
                        DiffCategory.Form, null, DiffAction.copy, 'umschlag');
        } else if (this.compare.umschlag !== this.base.umschlag) {
            this.add(0, null, Change.Patched, DiffType.Umschlag, this.base.umschlag, null,
                        DiffCategory.Form, null, DiffAction.copy, 'umschlag');
        }
    }

    private ofPages() {
        for (const basePage of this.base.pages) {
            const compPage = this.getPageById(this.compare, basePage.id);

            if (compPage === null) {
                // Formularseite wurde hinzugefügt
                this.add(basePage.id, basePage.name, Change.Added, DiffType.Formpage, '', null, DiffCategory.Page);
            } else {
                // Eigenschaften der Seite
                this.elementCompare(basePage, compPage, false, true);
                

                // Elementeigenschaften
                for (const baseEl of basePage.rows) {
                    const compEl = this.getElementById(compPage, baseEl.id);
                    if (compEl === null) {
                        this.add(baseEl.id, baseEl.label || baseEl.typ, Change.Added, DiffType.Element, '', null, DiffCategory.Element);
                    } else {
                        this.ofElements(baseEl, compEl);
                    }
                }
            }
        }

        for (const compPage of this.compare.pages) {
            const basePage = this.getPageById(this.base, compPage.id);

            if (basePage === null) {
                // Formularseite wurde gelöscht
                this.add(compPage.id, compPage.name, Change.Deleted, DiffType.Formpage, '', null, DiffCategory.Page);
            } else {
                for (const compEl of compPage.rows) {
                    if (this.getElementById(basePage, compEl.id) === null) {
                        this.add(compEl.id, compEl.label || compEl.typ, Change.Deleted, DiffType.Element, '', null, DiffCategory.Element);
                    }
                }
            }
        }


    }

    private elementCompare(base: any, comp: any, reverse?: boolean, isPage?: boolean) {
        reverse = reverse || false;
        const cat = isPage ? DiffCategory.Page : DiffCategory.Element;

        

        for (const p of Object.keys(base)) {

            // Alle nicht relevanten Properties überspringen
            if (p === 'id' || p === 'path' || p === 'typ' || p === 'isElement' || p === 'rows') {
                continue;
            }
            
            // per-Property Compare
            switch (p) {
                // fixe Properties - nur Patched
                case 'position':
                case 'width':
                    if (!reverse && base[p] !== comp[p]) {
                        this.add(base.id, base.name || base.label || base.typ, Change.Patched, DiffCfg[p].difftype, base[p],
                                    Properties[p], cat, comp[p]);
                    }
                    break;        

                // Special treatment properties
                case 'werte':
                    if (!reverse && base[p].length > 0) {
                        if (comp[p] === undefined || comp[p] === null) {
                            this.add(base.id, base.name || base.label || base.typ, Change.Added, 
                                        DiffCfg[p].difftype, base[p].join('|'), Properties.werte, cat);
                        } else {
                            if (JSON.stringify(base[p]) !== JSON.stringify(comp[p])) {
                                this.add(base.id, base.name || base.label || base.typ, Change.Patched, 
                                            DiffCfg[p].difftype, base[p].join('|'), Properties.werte, cat);
                            }
                        }
                    }
                    break;
                
                case 'conditions':
                    if (comp[p] === undefined || comp[p] === null) {

                        if (reverse) {
                            this.add(base.id, base.name || base.label || base.typ, Change.Deleted, 
                                DiffCfg[p].difftype, '', Properties.conditions, cat); // Action
                        } else {
                            this.add(base.id, base.name || base.label || base.typ, Change.Added, 
                                    DiffCfg[p].difftype, '', Properties.conditions, cat); // Action
                        }
                    } else {
                        if (!reverse && JSON.stringify(base[p]) !== JSON.stringify(comp[p])) {
                            this.add(base.id, base.name || base.label || base.typ, Change.Patched, 
                                        DiffCfg[p].difftype, '', Properties.conditions, cat); // Action
                        }
                    }
                    break;
                case 'hide':
                    if (!reverse && (comp[p] === undefined || comp[p] === null || base[p] !== comp[p])) {
                        const jetzt = (comp[p]) ? 'Element anzeigen' : 'Element nicht anzeigen (1 !=1 )';
                        this.add(base.id, base.name || base.label || base.typ, Change.Patched, 
                            DiffCfg.conditions.difftype, jetzt, Properties.conditions, cat);
                    }
                    break;
                case 'validation':
                    if (comp[p] === undefined || comp[p] === null) {

                        if (reverse) {
                            this.add(base.id, base.name || base.label || base.typ, Change.Deleted, 
                                DiffCfg[p].difftype, '', Properties.validation, cat); // Action
                        } else {
                            this.add(base.id, base.name || base.label || base.typ, Change.Added, 
                                    DiffCfg[p].difftype, '', Properties.validation, cat); // Action
                        }
                    } else {
                        if (!reverse && JSON.stringify(base[p]) !== JSON.stringify(comp[p])) {
                            this.add(base.id, base.name || base.label || base.typ, Change.Patched, 
                                        DiffCfg[p].difftype, '', Properties.validation, cat); // Action
                        }
                    }
                    break;

                default:
                // optionale Properties - Added/Patched/Deleted
                    /*
                case 'istPflicht':
                case 'repeat':
                case 'linkedID':
                case 'info':
                case 'error':
                case 'label':
                case 'notes':
                */
                    if (comp[p] === undefined || !comp.hasOwnProperty(p) || comp[p] === null) {
                        if (reverse) {
                            this.add(comp.id, comp.name || comp.label || comp.typ, Change.Deleted, DiffCfg[p].difftype, '',
                                    Properties[p], cat);
                        } else {
                            this.add(base.id, base.name || base.label || base.typ, Change.Added, DiffCfg[p].difftype, base[p],
                                    Properties[p], cat);
                        }
                    } else if (!reverse && comp[p] !== base[p]) {
                        this.add(base.id, base.name || base.label || base.typ, Change.Patched, DiffCfg[p].difftype, base[p], 
                                Properties[p], cat, comp[p], DiffCfg[p].action, p);
                    }
                    break;
            }
        }
    }

    private getPageById(form: Formular, id: number): FormPage {
        for (const p of form.pages) {
            if (p.id === id) {
                return p;
            }
        }
        return null;
    }

    private getElementById(grid: any, id: number): XControl {
        let ret = null;
        for (const el of grid.rows) {
            if (el.id === id) {
                return el;
            }
            if (el.rows) {
                ret = this.getElementById(el, id);
            }
        }
        return ret;
    }

    private ofElements(baseElement: any, compElement: any) {
        
        this.elementCompare(baseElement, compElement);
        this.elementCompare(baseElement, compElement, true);
        
        if (baseElement.rows) {
            for (const el of baseElement.rows) {
                const compEl = this.getElementById(compElement, el.id);

                if (compEl === null) {
                    this.add(el.id, el.name || el.label || el.typ, Change.Added, 
                            DiffType.Element, '', null, DiffCategory.Element);
                } else {
                    this.ofElements(el, compEl);
                }
            }

            if (compElement.rows) {
                for (const cel of compElement.rows) {
                    const findEl = this.getElementById(compElement, cel.id);
                    
                    if (findEl === null) {
                        this.add(cel.id, cel.name || cel.label || cel.typ, Change.Deleted, DiffType.Element, '',
                                null, DiffCategory.Element);
                    }
                }
            }
        }
    }
}
