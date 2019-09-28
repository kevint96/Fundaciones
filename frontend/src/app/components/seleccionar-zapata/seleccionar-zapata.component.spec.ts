import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarZapataComponent } from './seleccionar-zapata.component';

describe('SeleccionarZapataComponent', () => {
  let component: SeleccionarZapataComponent;
  let fixture: ComponentFixture<SeleccionarZapataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarZapataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarZapataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
