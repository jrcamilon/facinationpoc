import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColrowHeaderComponent } from './colrow-header.component';

describe('ColrowHeaderComponent', () => {
  let component: ColrowHeaderComponent;
  let fixture: ComponentFixture<ColrowHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColrowHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColrowHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
