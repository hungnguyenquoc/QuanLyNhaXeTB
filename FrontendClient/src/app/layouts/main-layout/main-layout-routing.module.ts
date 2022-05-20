import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { MAIN_ROUTES } from '../../configs/main-layout.routes';
import { ComponentsModule } from 'src/app/shared/components/components.module';


const route: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: MAIN_ROUTES
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
  ]
})
export class MainLayoutRoutingModule { }
