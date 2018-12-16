import { VersionTreeNode, VersionInfo } from './../../models/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mpu-form-versions',
  templateUrl: './form-versions.component.html',
  styleUrls: ['./form-versions.component.scss']
})
export class FormVersionsComponent implements OnInit {

  @Input() versions: VersionTreeNode[];
  @Input() formId: number;
  @Input() latestVersion: VersionInfo;
  @Output() setVersion = new EventEmitter<any>();

  public active: VersionTreeNode;


  constructor() { }

  ngOnInit() {
    console.log(this.versions);
    this.active = <VersionTreeNode>this.versions.find(major => major.Number === this.latestVersion.MajorVersion)
                  .children.find(minor => minor['Number'] === this.latestVersion.MinorVersion);
  }

  emitStage(stage: string) {
    this.setVersion.emit();
  }

}
