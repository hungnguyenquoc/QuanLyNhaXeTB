import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AuthenticationModule } from './pages/authentication/authentication.module';
import { BookingTicketComponent } from './pages/booking-ticket/booking-ticket.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainLayoutModule,
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
