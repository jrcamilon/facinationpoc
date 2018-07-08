import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridboxComponent } from './gridbox.component';

describe('GridboxComponent', () => {
  let component: GridboxComponent;
  let fixture: ComponentFixture<GridboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
