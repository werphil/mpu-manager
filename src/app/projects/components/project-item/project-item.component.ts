import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProjectListProject } from '../../models/project';

@Component({
  selector: 'mpu-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() project: ProjectListProject;
  @Output() addForm = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }


}
