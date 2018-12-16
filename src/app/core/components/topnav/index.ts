import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mpu-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  @Input() showMenu = false;
  @Input() formName = '';
  @Input() loginName = 'N/A';
  @Input() showHome = false;

  constructor() { }

  ngOnInit() {
  }

}
