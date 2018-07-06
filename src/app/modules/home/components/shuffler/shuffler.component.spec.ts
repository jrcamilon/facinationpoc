import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShufflerComponent } from './shuffler.component';

describe('ShufflerComponent', () => {
  let component: ShufflerComponent;
  let fixture: ComponentFixture<ShufflerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShufflerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShufflerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
