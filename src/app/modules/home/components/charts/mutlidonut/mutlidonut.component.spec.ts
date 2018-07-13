import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MutlidonutComponent } from './mutlidonut.component';

describe('MutlidonutComponent', () => {
  let component: MutlidonutComponent;
  let fixture: ComponentFixture<MutlidonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutlidonutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MutlidonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
