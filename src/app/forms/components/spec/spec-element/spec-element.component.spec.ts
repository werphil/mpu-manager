/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SpecElementComponent } from './spec-element.component';

describe('SpecElementComponent', () => {
  let component: SpecElementComponent;
  let fixture: ComponentFixture<SpecElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
