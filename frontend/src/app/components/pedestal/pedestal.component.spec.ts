import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedestalComponent } from './pedestal.component';

describe('PedestalComponent', () => {
  let component: PedestalComponent;
  let fixture: ComponentFixture<PedestalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedestalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedestalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
