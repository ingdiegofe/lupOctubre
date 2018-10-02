import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatEmpresaComponent } from './cat-empresa.component';

describe('CatEmpresaComponent', () => {
  let component: CatEmpresaComponent;
  let fixture: ComponentFixture<CatEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
