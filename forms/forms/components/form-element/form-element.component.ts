import { ValidationDialogComponent } from './../validation-dialog/validation-dialog.component';

import { ControlConfig, ElementWidth, RepeatOption } from '../../../../config/controlconfig';
import { FormElement, XControl, FormPage, FormGrid } from '../../../../classes/controls';

import { DataService } from './../../../data.service';

import { Component, Input, OnInit, Output, Renderer2, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConditionDialogComponent } from '../condition-dialog/condition-dialog.component';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.css']
})
export class FormElementComponent implements OnInit {
  @Input() element: XControl;
  @Input() resizable: boolean;
  @Input() parent: FormGrid;

    

  cfg = ControlConfig;
  repeatOption = RepeatOption;
  
  allControls = null;

  eingabe = {
    wert: '',
    defWerte: []
  };
  
  constructor(private modalService: NgbModal,
              private renderer: Renderer2,
              private datasvc: DataService) { }

  ngOnInit() {
    
    this.datasvc.loadDefaultValues().subscribe(
      data => this.eingabe.defWerte = data,
      error => this.eingabe.defWerte = new Array()
    );

    this.allControls = this.datasvc.getElementList();
      
    }
    
  private hasInterface(property: string): boolean {
    return (this.element[property] !== undefined);
  }
  
  hatWerte(): boolean {
    if (this.hasInterface('werte')) {
      return (this.element['werte'].length > 0);
    } else {
      return false;
    }
  }
  
  resizeElement(): void {
    if (this.element.width === ElementWidth.normal) {
      /* if (this.element.position.y === 2) {
        // Keine Verdopplung möglich, wenn rechts daneben ein Element ist oder wenn das Element in der rechten Spalte ist
        this.element.width = ElementWidth.halb;
      } else {
        this.element.width = ElementWidth.doppelt;
      } */
      this.element.width = ElementWidth.doppelt;
    } else if (this.element.width === ElementWidth.doppelt) {
      this.element.width = ElementWidth.halb;
    } else {
      this.element.width = ElementWidth.normal;
    }
  }

  
  openDialog(dlgRef, focusElement: string, large?: false): void {
    if (large) {
      this.modalService.open(dlgRef, { size: 'lg'});
    } else {
      this.modalService.open(dlgRef);
    }
    
    
    if (focusElement !== '') {
      /* let onElement = this.renderer.selectRootElement('#' + focusElement + '-' + this.element.id);
      console.log(onElement);
      onElement.focus(); */
    }
  }
  
  insertStandardwerte(werte: string[]): void {
    for (const val of werte) {
      this.element['werte'].push(val);
    }
  }
  

  openConditionDlg(): void {
    const dlgRef = this.modalService.open(ConditionDialogComponent, { size: 'lg' });
    dlgRef.componentInstance.active = this.element;
  }

  openValidationDlg(): void {
    const dlgRef = this.modalService.open(ValidationDialogComponent, { size: 'lg' });
    dlgRef.componentInstance.active = this.element;
  }

  toggleRepeat() {
    if (!this.element['repeat']) { return; }

    if (this.element['repeat'] === RepeatOption.None) {
      this.element['repeat'] = RepeatOption.Subform;
    } else if (this.element['repeat'] === RepeatOption.Subform) {
      this.element['repeat'] = RepeatOption.Table;
    } else {
      this.element['repeat'] = RepeatOption.None;
    }
  }


}
