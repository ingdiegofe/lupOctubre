import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLogComponent } from './navbar-log.component';

describe('NavbarLogComponent', () => {
  let component: NavbarLogComponent;
  let fixture: ComponentFixture<NavbarLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
