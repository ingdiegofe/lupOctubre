import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoPersonasComponent } from './mantenimiento-personas.component';

describe('MantenimientoPersonasComponent', () => {
  let component: MantenimientoPersonasComponent;
  let fixture: ComponentFixture<MantenimientoPersonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoPersonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
