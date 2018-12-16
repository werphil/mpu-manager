import { apiPath, basePath } from './../config/apiconfig';
/**
 * Zentrales Service für die Detailansicht von Formularen
 * Hält das aktive Formular als Objekt, auch die FormGroup für die Vorschau
 */

import { ControlConfig } from './../config/controlconfig';
import { ElementList } from './../classes/controls';

import { Validation, ValidationType, ValidationConfig, PatternChip, mpuValidator } from './../config/validation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjekteService } from './../projects/projekte.service';
import { ProjektDaten, Projekt } from './../classes/projekte';
import { ControlType } from '../config/controlconfig';
import { Injectable } from '@angular/core';
import { ControlFactory, XControl, Formular, FormPage, FormMeta, FormGrid } from '../classes/controls';
import { DefaultValue } from '../config/controlconfig';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject ,  Observable ,  of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface ProjektResult {
  pindex: number; // Index des Projekts
  findex: number; // Index des Formulars
  pdata: ProjektListe;
}

interface ProjektListe {
  lastID: number;
  projekte: Projekt[];
}

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

@Injectable()
export class DataService {
  
  private form: Formular; // Das aktive Formular
  private formUpdate: Subject<Formular>; // Das Observable des aktiven Formulars
  private defValues: DefaultValue[];  // Standardwerte für Auswahllisten, die über JSON geladen werden
  private projektdaten: ProjektDaten; // Enthalten die Eigenschaften zum aktuell geladenen Projekt inkl. Formular(e)
  private fg: FormGroup;  // Die Formgroup, die die Elemente für die Live-Vorschau enthält


  constructor(private http: HttpClient, private projektsvc: ProjekteService) {
    this.defValues = new Array();
    this.projektdaten = null;
    this.form = new Formular();
    this.formUpdate = <Subject<Formular>>new Subject();

  }
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
  // PUBLIC
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  
  /**
  * Lädt eine Formulardatei (Format: f[id]v[major]m[minor].json) über HTTP und setzt es als aktives fest
  * @param id Die ID des Formulars 
  * @param version Die Version des Formulars
  */
  loadForm(id: number, major: number, minor: number): void {
    this.loadFormVersion(id, major, minor).subscribe(
      data => {
        this.form = new Formular(data);
        this.formUpdate.next(Object.assign({}, this.form));
      },
      error => {
        this.form = null;
        console.error(error);
        this.formUpdate.next(null);
        
      }
    );
  }

  /**
   * Lädt eine Formulardatei (Format: f[id]v[major]m[minor].json) über HTTP
   * @param id Die ID des Formulars
   * @param major Die Major-Version des Formulars
   */
  loadFormVersion(id: number, major: number, minor: number): Observable<Formular> {
    console.log('assets/projekte/forms/f' + id + 'v' + major + 'm' + minor + '.txt');
    return this.http.get<any>('assets/projekte/forms/f' + id + 'v' + major + 'm' + minor + '.txt');
  }

  /**
   * Legt ein bestimmtes Formular
   * @param formular 
   */
  setForm(formular: Formular): void {
    this.form = formular;
    this.formUpdate.next(this.form);
  }

  /**
   * Generiert ein leeres, neues Formular
   */
  makeBlank(): void {
    this.form = new Formular();
    this.newPage('Neue Seite');
    this.formUpdate.next(Object.assign({}, this.form));
  }
  
  /**
   * Fügt dem Formular eine neue Seite hinzu
   * @param pageName Anzeigename der Seite
   */
  newPage(pageName: string): void {

    this.form.metadata.pcounter++;
    this.form.pages.push(new FormPage(pageName, this.form.metadata.pcounter));  
  }
  
  /**
   * Gibt auf Basis der Seiten-ID das Seitenobjekt zurück
   * @param id Die ID der Formularseite
   */
  getPage(id: number): FormPage {
    for (let i = 0; i < this.form.pages.length; i++) {
      if (this.form.pages[i].id === id) {
        return this.form.pages[i];
      }  
    }
    
    return null;
  }
  
  /**
   * Gibt das aktive Formular-Objekt zurück
   */
  getForm(): Formular {
    return this.form;
  }

  /**
   * Gibt das Observable des aktuellen Formulars zurück. 
   * Wichtig, damit alle Detailansichten (edit/preview/...) synchron bleiben
   */
  getFormdata(): Observable<Formular>  {
    return this.formUpdate.asObservable();
  }

  /**
   * Gibt die Metadaten des aktiven Formulars zurück
   */
  getMetadata(): FormMeta {
    return this.form.metadata;
  }
  
  /**
   * Führt einen HTTP-Request für die Standardwerte für Auswahllisten aus
   */
  loadDefaultValues(): Observable<DefaultValue[]> {
    return this.http.get<DefaultValue[]>('assets/wertelisten.txt').pipe(
      catchError(this.errHandler('Die Standardwerte konnten nicht geladen werden.', []))
    );
  }


  /**
   * Gibt ein Element auf Basis einer ID zurück, allerdings keine Formularseite 
   * @param id die ID des zu suchenden Elements
   * @param grid Das Grid, in welchem das Element gesucht werden soll (für Rekursivität)
   */
  getElementById(id: number, grid?: any): XControl {
    if (grid) {
      for (const ctrl of grid.rows) {

        // tslint:disable-next-line:triple-equals
        if (ctrl.id == id) {
          return ctrl;
        }

        if (ctrl.rows) {
          const found = this.getElementById(id, ctrl);
          if (found && found !== null) {
            return found;
          }
        }

      }
      return null;
    } else {
      for (const page of this.form.pages) {
        return this.getElementById(id, page);
      }
    }

  }

  /**
   * Wertet die Anzeigebedingungen eines Elements aus und gibt zurück ob es angezeigt werden soll oder nicht
   * @param el Das zu prüfende Element
   */
  showElement(el: XControl): boolean {

    let str = '';
    
    for (let i = 0; i < el.conditions.length; i++) {
      const wert = this.getElementValue(el.conditions[i].id);
      const vergleich = (el.conditions[i].value.substring(0, 3) === 'id=')  
                              ? this.getElementValue(Number(el.conditions[i].value.substring(3)))
                              : el.conditions[i].value;
      

      const tf = this.evaluate(wert, el.conditions[i].operator, vergleich);

      if (i === 0) {
        str = String(tf);
      } else {
        str += (el.conditions[i].mode === 'und') ? ' && ' : ' || '; 
        str += String(tf);
      }
    }

    return this.getBool(str);
  }

  /**
   * Gibt den aktuellen Wert eines Elements im Preview-Modus zurück 
   * @param id Die ID des Elements
   */
  getElementValue(id: number): any {

    const el = this.getElementById(id);
    if (!el || el === null) {
      return '#WERT';
    }
    let path = el.path;

    if (!path.includes('/')) {
      return null;
    }
    path = path.replace(/\//g, '.');

    return this.fg.get(path).value;

  }
  
  /**
   * Gibt die Formgroup zurück auf Basis des Pfades
   * @param path Der Pfad des Elements
   */
  getFormgroup(path: string) {
    path = path.replace(/\//g, '.');

    return this.fg.get(path);
  }
  
  /**
   * Gibt Infos zum aktuellen Projekt zurück, v.a. die Formularversionen des aktiven Formulars
   */
  getProjektInfo(): Observable<ProjektDaten> {
    return new Observable<ProjektDaten>((observer) => {
      observer.next({
        projektname: '',
        formularname: '',
        versionen: null,
        lastVersion: 0
      });

      if (this.form === null) {
        observer.error('Kein Formular geladen.');
        return;
      }

      this.projektsvc.getProjects().subscribe(
         daten => {
          /* 
          let name = '';
          let formular = '';
          let last = 0;
          let vers = null;
          
          for (const proj of daten.Projects) {
            for (const form of proj.forms) {
              if (form.id === this.form.metadata.id) {
                last = form.currentVersion;
                name = proj.name;
                formular = form.name;
                vers = form.versions;
              }
            }
          }

          this.projektdaten = {
            projektname: name,
            formularname: formular,
            versionen: vers,
            lastVersion: last
          };
          observer.next(this.projektdaten);
          observer.complete(); */
        },
        error => {
          this.projektdaten = null;
          observer.error(this.projektdaten);
        }
      );
    });
  }

  /**
   * Erstellt eine FormGroup inkl. Untergruppen für das aktive Formular (für Preview)
   */
  toFormGroup(): FormGroup {

    if (this.form.pages.length === 0) {
      return null;
    }

    const group: any = {};
    this.form.pages.forEach(page => {
      group['p' + page.id] = this.makeFormGroups(page);
    });
    this.fg = new FormGroup(group);
    return this.fg;
  }

  /**
   * Erstellt eine komprimierte Liste aller Elemente des aktiven Formulars
   * Struktur: Seiten > Elemente
   */
  getElementList(): ElementList[] {
    const ret = new Array<ElementList>();

    for (const p of this.form.pages) {
      const page: ElementList = {
        label: p.name,
        elements: new Array()
      };

      for (const el of p.rows) {

        // if (!el.hasOwnProperty('value')) { continue; }

        if (el.rows) {
          page.elements.push.apply(page.elements, this.getGroupElements(el));
        } else {
          page.elements.push({
            id: el.id,
            label: el.label,
            values: el.werte || null
          });
        }
      }
      ret.push(page);
    }

    return ret;
  }

  saveForm(): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 
        'Content-Type': 'text/plain',
        'accept': 'application/json;odata=verbose',
        'X-HTTP-Method': 'PUT',
        'X-RequestDigest': localStorage.getItem('digest')
      })
    };

    const id = this.form.metadata.id;
    const vers = this.form.metadata.version;

    return this.http.post<any>(apiPath + '_api/web/GetFileByServerRelativeUrl(\'' +
                              basePath + 'assets/projekte/forms/f' + id + 'v' + vers + '.txt\')/$value',
                              JSON.stringify(this.form), options);
  }

  saveVersion(notiz?: string): Observable<any> {
    const id = this.form.metadata.id;
    const version = this.projektdaten.lastVersion + 1;

    const options = {
      headers: new HttpHeaders({ 
        'Content-Type': 'text/plain',
        'accept': 'application/json;odata=verbose',
        'X-RequestDigest': localStorage.getItem('digest')
      })
    };

    return new Observable<any>((observe) => {

      observe.next({result: null});

      this.http.post<any>(apiPath + '_api/web/GetFolderByServerRelativeUrl(\'' +
                        basePath + 'assets/projekte/forms/\')/Files/add(url=\'f' + id + 'v' + version + '.txt\',overwrite=true)',
                        JSON.stringify(this.form), options).subscribe(
        data => {
          console.log(data);
          this.getProjectIndexById(this.form.metadata.id).subscribe(indexData => {
            const pdata = indexData.pdata;
            console.log(pdata);

            pdata.projekte[indexData.pindex].forms[indexData.findex].currentVersion = version;
            pdata.projekte[indexData.pindex].forms[indexData.findex].lastEdit = Date.now();
            pdata.projekte[indexData.pindex].forms[indexData.findex].versions.push({
              nr: version,
              timestamp: Date.now(),
              desc: notiz || ''
            });

            this.projektsvc.saveListe(JSON.stringify(pdata)).subscribe(r => {
              observe.next({result: true});
            }, err => {
              observe.error(err);
            });

          }, errorIndex => {
            console.log(errorIndex);
            observe.error(errorIndex);
          });                           
        }, error => {
          observe.error(error);
        });
    });
  }

  /**
   * 
   * @param id 
   */
  private getProjectIndexById(id: number): Observable<ProjektResult> {

    return new Observable<ProjektResult>((observer) => {

      /*observer.next({
        pindex: -1,
        findex: 0,
        pdata: null
      });*/

      this.projektsvc.getProjects().subscribe(projektdata => {
        console.log('PDATA');
        console.log(projektdata);
        const pdata = projektdata;
        let found = false;
        /*
        for (let j = 0; j < pdata.projekte.length; j++) {
          for (let i = 0; i < pdata.projekte[j].forms.length; i++) {
            if (pdata.projekte[j].forms[i].id === this.form.metadata.id) {
              found = true;
              observer.next({
                pindex: j,
                findex: i,
                pdata: pdata
              });
            }
          }
        }
        */
       found = false;
        if (!found) {
          observer.error('ID was not found');
        }
      }, error => {
        observer.error('Could not receive Projects');
      });

    });
  }

  private c2c() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(this.form);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
  // PRIVATE
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  /**
   * Rekursive Funktion, die beginnend beim Basisgrid (Formularseite) eine ReactiveForms-kompatible Struktur aufbaut
   * @param grid 
   */
  private makeFormGroups(grid: any): FormGroup {
    const group: any = {};

    grid.rows.forEach(row => {
      if (row.rows) {
        group['g' + row.id] = this.makeFormGroups(row);
      } else {
        let valarr;
        if (row.validation && row.validation.type !== ValidationType.None) {
          valarr = row.istPflicht ? [Validators.required, mpuValidator(row.validation)] : mpuValidator(row.validation);
        } else {
          valarr = row.istPflicht ? Validators.required : null;
        }
        const pref = (row.prefill && row.prefill !== null && row.prefill.length > 0)  ? 
          (ControlConfig[row.typ].prefillFormat.showRegister) ? ControlConfig[row.typ].prefillFormat.text + row.prefill 
                                                              : ControlConfig[row.typ].prefillFormat.text
                                                            : ''; 

        group['e' + row.id] = new FormControl(pref, valarr);

      }
    });

    return new FormGroup(group);
  }

  /**
   * Führt einen logischen Vergleich durch. Wichtig für Anzeigebedingungen
   * @param wert // Der Ausgangswert
   * @param operator // Der Vergleichsoperator
   * @param vergleich // der Vergleichswert
   */
  private evaluate(wert, operator, vergleich): boolean {
 
    switch (operator) {
      case '==':
        return (wert === vergleich);
      case '>':
        return (wert > vergleich);
      case '<':
        return (wert < vergleich);
      case '!=':
        return (wert !== vergleich);
      default:
        return false;
    }
  }

  /**
   * Ermittelt aus einer Kette (im Stringformat) mit mehreren Bedingungen den endgültigen Wert für Anzeigebedingungen
   * Erlaubte Bestandteile sind true, false, ||, && (z.B. true || false && true)
   * @param fn Der auszuwertende String
   */
  private getBool(fn: string): boolean {
    const ev = fn.replace(/(?!true|false|&&|\|\|)/g, '');
    return new Function('return (' + ev + ')')();
  }

  /**
   * Zieht aus Sub-Grids Elemente in die ElementeListe, damit die Hierarchie nur noch Seite > Elemente ist
   * Utility-Function für getElementList
   * @param element Das zu durchsuchende Grid
   * @param final Das nach allen Rekursionen fertige Array
   */
  private getGroupElements(element, final?: ElementList[]): ElementList[] {
    let ret: ElementList[] = new Array<ElementList>();
    if (final) {
      ret = final;
    }

    for (const el of element.rows) {

      // if (!el.hasOwnProperty('value')) { continue; }

      if (el.rows) {
        this.getGroupElements(<FormGroup>el, ret);
      } else {
        ret.push({
          id: el.id,
          label: '| ' + el.label,
          values: el.werte || null
        });
      }
    }
    return ret;
  }

  private errHandler<T> (errText = 'Fehler beim Laden der Daten.', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return throwError(error);
    };
  }


}

