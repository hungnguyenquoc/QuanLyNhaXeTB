import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RouterModule } from '@angular/router';
import { HelloComponent } from './components/hello/hello.component';
import { AuthenticationComponent } from './authentication.component';



@NgModule({
  declarations: [
    AuthenticationComponent,
    HelloComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    RouterModule
  ]
})
export class AuthenticationModule { }
