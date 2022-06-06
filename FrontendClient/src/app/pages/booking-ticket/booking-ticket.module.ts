import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingTicketRoutingModule } from './booking-ticket-routing.module';
import { RoutesSearchComponent } from './components/routes-search/routes-search.component';
import { BookingTicketComponent } from './booking-ticket.component';
import { RouterModule } from '@angular/router';
import { RoutesResultComponent } from './components/routes-result/routes-result.component';
import { NavbarBookingComponent } from './components/navbar-booking/navbar-booking.component';
import { InfoCustomerComponent } from './components/info-customer/info-customer.component';
import { SelectChairComponent } from './components/select-chair/select-chair.component';



@NgModule({
  declarations: [
    BookingTicketComponent,
    RoutesSearchComponent,
    RoutesResultComponent,
    NavbarBookingComponent,
    InfoCustomerComponent,
    SelectChairComponent
  ],
  imports: [
    CommonModule,
    BookingTicketRoutingModule,
    RouterModule
  ]
})
export class BookingTicketModule { }
