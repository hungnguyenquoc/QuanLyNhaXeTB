import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBookingComponent } from './navbar-booking.component';

describe('NavbarBookingComponent', () => {
  let component: NavbarBookingComponent;
  let fixture: ComponentFixture<NavbarBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
