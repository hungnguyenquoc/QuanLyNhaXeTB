import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MainLayoutComponent } from './main-layout.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MainLayoutRoutingModule,
    RouterModule
  ],
})
export class MainLayoutModule { }
