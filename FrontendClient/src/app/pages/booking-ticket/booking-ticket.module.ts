import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingTicketRoutingModule } from './booking-ticket-routing.module';
import { RoutesSearchComponent } from './components/routes-search/routes-search.component';
import { BookingTicketComponent } from './booking-ticket.component';
import { RouterModule } from '@angular/router';
import { RoutesResultComponent } from './components/routes-result/routes-result.component';



@NgModule({
  declarations: [
    BookingTicketComponent,
    RoutesSearchComponent,
    RoutesResultComponent
  ],
  imports: [
    CommonModule,
    BookingTicketRoutingModule,
    RouterModule
  ]
})
export class BookingTicketModule { }
