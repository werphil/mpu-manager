/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModelToolComponent } from './model-tool.component';

describe('ModelToolComponent', () => {
  let component: ModelToolComponent;
  let fixture: ComponentFixture<ModelToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
