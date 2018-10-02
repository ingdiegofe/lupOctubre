import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorCargaComponent } from './indicador-carga.component';

describe('IndicardorCargaComponent', () => {
  let component: IndicadorCargaComponent;
  let fixture: ComponentFixture<IndicadorCargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorCargaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
