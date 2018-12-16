/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ElementLiComponent } from './element-li.component';

describe('ElementLiComponent', () => {
  let component: ElementLiComponent;
  let fixture: ComponentFixture<ElementLiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementLiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
