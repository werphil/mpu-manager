import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProjectListProject } from '../../models/project';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mpu-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  @Input() projects: ProjectListProject[];
  @Output() addForm = new EventEmitter<number>();
  @Output() addProject = new EventEmitter();

  filter = '';

  constructor() { }

  ngOnInit() {
  }

}
