import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoutesSearchComponent } from './components/routes-search/routes-search.component';
import { RoutesResultComponent } from './components/routes-result/routes-result.component';
import { InfoCustomerComponent } from './components/info-customer/info-customer.component';
import { SelectChairComponent } from './components/select-chair/select-chair.component';

const routes: Routes = [
  {
    path: '',
    component: RoutesSearchComponent,
  },
  {
    path: 'route-result',
    component: RoutesResultComponent
  },
  {
    path: 'info-customer',
    component: InfoCustomerComponent
  },
  {
    path: 'select-chair',
    component: SelectChairComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingTicketRoutingModule { }
