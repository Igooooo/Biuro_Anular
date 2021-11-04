import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageTableComponent } from './main-page-table.component';

describe('MainPageTableComponent', () => {
  let component: MainPageTableComponent;
  let fixture: ComponentFixture<MainPageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
