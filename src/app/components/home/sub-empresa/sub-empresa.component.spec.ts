import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubEmpresaComponent } from './sub-empresa.component';

describe('SubEmpresaComponent', () => {
  let component: SubEmpresaComponent;
  let fixture: ComponentFixture<SubEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
