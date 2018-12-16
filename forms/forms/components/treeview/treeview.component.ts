import { Compare, DiffCategory } from './../../vergleich/FormComparer';
import { Formular } from './../../../classes/controls';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements OnInit {
  @Input() form: Formular;
  @Input() diffs: Compare[];

  view = {
    element: null
  };

  constructor() { }

  ngOnInit() {
  }

  getElementChanges() {
    if (!this.diffs || this.diffs.length === 0) {
      return null;
    }

    const change = {
      label: false,
      pflicht: false,
      position: false,
      width: false,
      conditions: false,
      notes: false,
      info: false,
      error: false,
      werte: false,
      repeat: false,
      prefill: false,
      validation: false,
      linked: false
  
    };

    for (const diff of this.diffs) {
      if (diff.id === this.view.element.id) {
        if (this.view.element.typ && diff.category === DiffCategory.Element 
            || !this.view.element.typ && diff.category === DiffCategory.Page) {
          
          change[diff.prop] = true;

        } 
      }
    }
    
    return change;
    
  }

  

}
