import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageSearchComponent } from './main-page-search.component';

describe('MainPageSearchComponent', () => {
  let component: MainPageSearchComponent;
  let fixture: ComponentFixture<MainPageSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
