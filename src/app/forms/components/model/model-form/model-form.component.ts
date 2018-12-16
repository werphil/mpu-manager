import { ModelForm } from './../../../models/form';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mpu-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.scss']
})
export class ModelFormComponent implements OnInit {
  @Input() form: ModelForm;
  @Output() add = new EventEmitter();

  selectedIndex = 0;
  
  constructor() { }

  ngOnInit() {
  }

  tabChanged(e) {
    if (e.index === (this.form.Pages.length - 1)) {
      // Plus geklickt
      this.add.emit();
      this.selectedIndex = e.index - 1;
    }
  }

}
