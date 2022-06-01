import { DataService } from './../../../Services/data.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ServerHttpService } from './../../../Services/server-http.service';
import { Login } from './../../../../models/Login';

import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
 login : Login;
 btnDisabled = true;
 url = "http://localhost:5000/api/NhanVien/Login";
  constructor(private rest : ServerHttpService , private router : Router ,private data : DataService) {
    this.login = new Login();
   }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  validate(){
    return true;
  }
async loginSubmit(){
  this.btnDisabled = true;
  if(this.validate())
this.rest.post(this.url,this.login,).then(data =>{
  
  let result = data as {token : string};
  localStorage.setItem('token', result.token);

  this.router.navigate(['dashboard']);
}).catch(error=>{
  this.data.error(error['error']);
  this.btnDisabled=false;
})
}
}
