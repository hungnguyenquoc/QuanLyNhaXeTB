import { Login } from './../../models/Login';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ServerHttpService {

private REST_API_URL = 'http://localhost:3000';
constructor(private http: HttpClient) {}
/*========================================
  CRUD Methods for consuming RESTful API
=========================================*/
// Http Options
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
// HttpClient API get() method => Fetch Login list
PostUser(data : any , url : string): Observable<any> {
  return this.http
    .post(this.REST_API_URL + `/${url}`, data , 
    this.httpOptions) 
    .pipe(retry(1), catchError(this.handleError));
    
  return throwError('Something bad happened: please try again later');

}
handleError(error: any) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent)
  {
    // Get client-side error
    errorMessage = error.error.message;
  } else 
  {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(() => {
    return errorMessage;
  });
}
}
