import { Component, OnInit, Input } from '@angular/core';
import { Tools, ControlConfig } from '../../../config/controlconfig';
import { XControl, FormGrid } from '../../../classes/controls';


@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  @Input() collapsed;
  constructor() { }
  
  tools = Tools;
  cfg = ControlConfig;
  
  dropped: XControl = null;
  
  onDrop(event) {
    const ctrl: XControl = event.dragData.control;
    const originGrid: FormGrid = event.dragData.parent;

    originGrid.removeElement(ctrl);
    this.dropped = ctrl;

  }

  public clearAblage() {
    this.dropped = null;
  }

  ngOnInit() {
  }

}
