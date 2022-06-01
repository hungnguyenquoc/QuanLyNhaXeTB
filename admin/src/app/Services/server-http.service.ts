import { Login } from './../../models/Login';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ServerHttpService {

constructor(private http: HttpClient) {}
/*========================================
  CRUD Methods for consuming RESTful API
=========================================*/
// Http Options
get(link:string){
  return this.http.get(link).toPromise();
}
getOne(link:string,id:string){
  return this.http.get(link).toPromise();
} 
post(link:string,body:any){
  return this.http.post(link,body).toPromise();
}
put(link:string,id:string,body:any){
  return this.http.get(link).toPromise();
}
delete(link:string,id:string){
  return this.http.get(link).toPromise();
}

}
