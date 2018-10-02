import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeSitioUsuarioComponent } from './mensaje-sitio-usuario.component';

describe('MensajeSitioUsuarioComponent', () => {
  let component: MensajeSitioUsuarioComponent;
  let fixture: ComponentFixture<MensajeSitioUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeSitioUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeSitioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
