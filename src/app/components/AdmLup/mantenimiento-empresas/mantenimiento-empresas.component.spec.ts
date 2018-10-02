import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoEmpresasComponent } from './mantenimiento-empresas.component';

describe('MantenimientoEmpresasComponent', () => {
  let component: MantenimientoEmpresasComponent;
  let fixture: ComponentFixture<MantenimientoEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
