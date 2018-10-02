import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoNoticiasComponent } from './mantenimiento-noticias.component';

describe('MantenimientoNoticiasComponent', () => {
  let component: MantenimientoNoticiasComponent;
  let fixture: ComponentFixture<MantenimientoNoticiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoNoticiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
