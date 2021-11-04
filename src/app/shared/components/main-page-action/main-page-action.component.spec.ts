import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageActionComponent } from './main-page-action.component';

describe('MainPageActionComponent', () => {
  let component: MainPageActionComponent;
  let fixture: ComponentFixture<MainPageActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
