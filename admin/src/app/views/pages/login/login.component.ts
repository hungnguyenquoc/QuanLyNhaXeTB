import { Router } from '@angular/router';
import { ServerHttpService } from './../../../Services/server-http.service';
import { Login } from './../../../../models/Login';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
 login : Login;
 btnDisabled = false;
 url = 'Login';
  constructor(private rest : ServerHttpService , private router : Router) {
    this.login = new Login();
   }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
async loginSubmit(){
this.rest.PostUser(this.login,this.url).subscribe(data =>{
  let result = data as {token:string};
  this.router.navigate(['/Dashboard']);
});
}
}
