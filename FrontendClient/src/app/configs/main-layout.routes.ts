import { Routes } from '@angular/router';


export const MAIN_ROUTES: Routes = [
  {
    path: 'authen',
    loadChildren: () => import('../pages/authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: 'booking-ticket',
    loadChildren: () => import('../pages/booking-ticket/booking-ticket.module').then((m) => m.BookingTicketModule),
  },
];
