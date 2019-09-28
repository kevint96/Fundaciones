import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapatasComponent } from './zapatas.component';

describe('ZapatasComponent', () => {
  let component: ZapatasComponent;
  let fixture: ComponentFixture<ZapatasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZapatasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZapatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
