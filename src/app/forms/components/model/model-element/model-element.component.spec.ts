/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModelElementComponent } from './model-element.component';

describe('ModelElementComponent', () => {
  let component: ModelElementComponent;
  let fixture: ComponentFixture<ModelElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
