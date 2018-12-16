/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VergleichComponent } from './vergleich.component';

describe('VergleichComponent', () => {
  let component: VergleichComponent;
  let fixture: ComponentFixture<VergleichComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VergleichComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VergleichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
