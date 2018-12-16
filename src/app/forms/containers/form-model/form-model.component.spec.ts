/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormModelComponent } from './form-model.component';

describe('FormModelComponent', () => {
  let component: FormModelComponent;
  let fixture: ComponentFixture<FormModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
