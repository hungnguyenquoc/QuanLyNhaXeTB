import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TuyenDuong } from '../models/TuyenDuong';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RoutesSearchParams } from '../models/routesSearchParams';
@Injectable({
  providedIn: 'root'
})
export class RoutesSearchService {

  baseUrl = environment.urlApi;
  routesSearch: TuyenDuong[] = [];
  routesSearchParams = new RoutesSearchParams();

  constructor(private http: HttpClient) { }

  getRoutes(): Observable<TuyenDuong[]> {
    return this.http.get<TuyenDuong[]>(this.baseUrl + 'TuyenDuong');
  }

  setShopParams(params: RoutesSearchParams) {
    this.routesSearchParams = params;
  }

  getShopParams() {
    return this.routesSearchParams;
  }
}
