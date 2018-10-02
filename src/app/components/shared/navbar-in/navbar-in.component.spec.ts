import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarInComponent } from './navbar-in.component';

describe('NavbarInComponent', () => {
  let component: NavbarInComponent;
  let fixture: ComponentFixture<NavbarInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
