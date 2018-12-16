import { AlertService } from './../../../shared/services/alert.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { State } from '../../../reducers';
import * as get from '../../selectors';
import { Select } from '../../actions/element.actions';
import { SpecNode, SpecificationElement } from '../../models/element';
import { SpecConfig } from '../../config/spec.config';
import { copy2clipboard } from '../../../utils/copyclipboard';
import { ControlConfig } from '../../config/controls.config';
import { TreeNode } from 'primeng/api';


@Component({
  selector: 'mpu-form-spec',
  templateUrl: './form-spec.component.html',
  styleUrls: ['./form-spec.component.scss']
})
export class FormSpecComponent implements OnInit {

  form$: Observable<SpecNode[]>;
  selectedNode: TreeNode;

  specConfig = SpecConfig;
  controls = ControlConfig;

  selectedElement$: Observable<SpecificationElement>;
  selectedElement: SpecificationElement;

  constructor(private store: Store<State>, private alert: AlertService) {
    this.form$ = this.store.pipe(select(get.FormSpecification));
    this.selectedElement$ = this.store.pipe(select(get.SelectedElement));
  }

  ngOnInit() {
    this.selectedElement$.subscribe(element => this.selectedElement = element);
  }

  onElementSelected(id: number): void {

    this.store.dispatch(new Select(id));
  }

  copyText(text: string) {
    copy2clipboard(text);
    this.alert.showMessage('info', 'Der Text wurde in die Zwischenablage kopiert.');
  }

}
