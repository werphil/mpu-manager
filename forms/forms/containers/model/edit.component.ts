import { Component, OnInit } from '@angular/core';

import { ToolboxComponent } from './toolbox/toolbox.component';
import { ModelComponent } from './model/model.component';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  cols = {
    tools: 2
  };
  
  resize = {
    lastX: 0,
    currX: 0,
    active: false,
    wndWidth: 0
  };
  
  constructor() { }



  ngOnInit() {
  }

  
  startResize(event) {
    this.resize.active = true;
    this.resize.lastX = event.clientX;
    this.resize.wndWidth = window.screen.width;
  }
  endResize(event) {
    this.resize.active = false;
  }
  doResize(event) {
    if (this.resize.active) {
      
      const step = this.resize.wndWidth / 12;
      this.resize.currX = event.clientX;
      const dist = event.clientX - this.resize.lastX;
      const nachLinks = (dist < 0); 
              
      if (dist >= step || (dist * -1) >= step) {

          if (!nachLinks && this.cols.tools >= 2) {
            return;
          }

          this.cols.tools = (nachLinks) ? this.cols.tools - 1 : this.cols.tools + 1;

        this.resize.lastX = event.clientX;
      }
    }
  }

}
