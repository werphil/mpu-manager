import { Component, OnInit, Input } from '@angular/core';
import { FormElement, ControlFactory, XControl, FormGrid, FormMeta, Control, BoundGroup } from '../../../../classes/controls';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConditionDialogComponent } from '../condition-dialog/condition-dialog.component';
import { ControlType } from '../../../../config/controlconfig';
import { DataService } from '../../../data.service';
import { NumberFormatStyle } from '@angular/common';
import { ToolboxComponent } from '../../toolbox/toolbox.component';
import { first } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() public parent: FormGrid;

  elements: XControl[];

  constructor(private modalService: NgbModal, private datasvc: DataService) { }

  ngOnInit() {
    this.elements = this.parent.rows;
  }

  /**
   * 
   * @param old 
   * @param event 
   */
  onDropElement(old, event) {
    const neu = event.dragData.control || event.dragData;

    // Das gleiche Element kann nicht verknüpft werden
    if (old.id === neu.id) { return; }

    const dlgRef = this.modalService.open(ConditionDialogComponent, { size: 'lg'});
    dlgRef.componentInstance.bind = old;
    dlgRef.componentInstance.active = neu;
    // dlg.componentInstance;
  }
  
  onDropBlank(event, targetPos: number) {

    const ctrl: XControl = event.dragData.control || event.dragData;
    const originGrid: FormGrid = event.dragData.parent || null;
    const ablage: ToolboxComponent = event.dragData.ablage || null;

    let finalPos: number = targetPos;

    if (ctrl.isElement) {
      // Bestehendes Element verschoben

      // In gleiche Gruppe oder Untergruppe -> keine Aktion 

      if (this.parent.path.includes(ctrl.path)) {
        return;
      }


      if (originGrid !== null) {

        // In gleicher Gruppe auf gleiche Position verschoben -> keine Aktion 
        if (originGrid.id === this.parent.id) {
          if (ctrl.position === targetPos) { return; }
          
          // Wenn in gleichem Grid verschoben, dann Verschiebe-Bug beseitigen
          finalPos = (ctrl.position < targetPos) ? targetPos - 1 : targetPos;
        } else {
          // interessant?
        }

        originGrid.removeElement(ctrl);
      } else {
        // Aus Ablage
        ablage.clearAblage();
      }
      
      ctrl.position = finalPos;
      this.parent.addElement(ctrl);

    } else {
      // Aus Toolbox neu
      this.addElement(ctrl.typ, targetPos);
    }

    
  }

  makeColumn(firstElement: XControl): void {
    const pos = firstElement.position;
    const clone = Object.assign({}, firstElement);
    this.parent.removeElement(firstElement);

    clone.position = 1;
    const bound = this.addElement(ControlType.BoundGroup, pos);
    bound.addElement(clone);
  }

  private addElement(type: ControlType, pos: number): XControl {
    const meta: FormMeta = this.datasvc.getMetadata();
    const el: XControl = ControlFactory.createElement(type);

    el.position = pos;
    
    meta.ecounter = meta.ecounter + 1;
    el.id = meta.ecounter;
    this.parent.addElement(el);
    return el;
  }


}
