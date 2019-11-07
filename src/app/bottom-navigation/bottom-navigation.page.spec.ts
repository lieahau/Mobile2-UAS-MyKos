import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavigationPage } from './bottom-navigation.page';

describe('BottomNavigationPage', () => {
  let component: BottomNavigationPage;
  let fixture: ComponentFixture<BottomNavigationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomNavigationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomNavigationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
