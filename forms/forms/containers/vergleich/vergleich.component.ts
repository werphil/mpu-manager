import { Compare, Change, FormComparer, DiffType, DiffCategory } from './FormComparer';
import { ProjektDaten } from './../../classes/projekte';
import { DataService } from './../data.service';
import { Formular } from './../../classes/controls';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-vergleich',
  templateUrl: './vergleich.component.html',
  styleUrls: ['./vergleich.component.css']
})
export class VergleichComponent implements OnInit {
  form: Formular; // Das aktive Formular
  compare: Formular; // Das Formular mit dem verglichen wird
  projektinfo: ProjektDaten;
  differences: Compare[];
  view = {
    mode: 'table'
  };


  constructor(private datasvc: DataService) { 
    this.form = null;
    this.compare = null;
    this.differences = null;
    this.projektinfo = null;
  }

  ngOnInit() {
    this.form = this.datasvc.getForm();
    this.compare = this.datasvc.getForm();
    this.datasvc.getFormdata().subscribe(formdata => {
      this.form = formdata;
      this.compare = formdata;
    });
    this.datasvc.getProjektInfo().subscribe(
      data => {
        this.projektinfo = data;
      }
    );

  }

  switchSides() {
    const temp = this.form;
    this.form = this.compare;
    this.compare = temp;
    this.differences = this.getDifferences();
  }

  setCompare(major: number, minor: number) {
    this.datasvc.loadFormVersion(this.form.metadata.id, major, minor).subscribe(
      data => {
        this.compare = data;
        this.differences = this.getDifferences();
      }, 
      error => {
        this.form = null;
        console.log(error);
    });
  }

  getDifferences(): Compare[] {
    const comparer = new FormComparer(this.form, this.compare);
    return comparer.getDifferences();
  }

  c2c(id: number, prop: string, cat: DiffCategory) {

    let el = null;

    if (cat === DiffCategory.Form) {
      el = this.form;
    } else if (cat === DiffCategory.Page) {
      el = this.datasvc.getPage(id);
    } else {
      el = this.datasvc.getElementById(id);
    }

    if (el === null) {
      window.alert('Konnte nicht kopieren - kein Element gefunden');
      return;
    }

    const text = el[prop];

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  getPageLabel(id): string {
    return this.datasvc.getPage(id).name || '';
  }

  getLabel(id): string {
    const el = this.datasvc.getElementById(id);
    if (el === null) {
      return '';
    }
    return el.label || el.typ;
  }

}
