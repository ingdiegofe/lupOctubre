import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioNoticiaComponent } from './formulario-noticia.component';

describe('FormularioNoticiaComponent', () => {
  let component: FormularioNoticiaComponent;
  let fixture: ComponentFixture<FormularioNoticiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioNoticiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
