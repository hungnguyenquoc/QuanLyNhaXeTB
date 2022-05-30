import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ChuyenXe } from '../models/ChuyenXe';

@Injectable({
  providedIn: 'root'
})
export class ChuyenXeService {

  baseUrl = environment.urlApi;
  chuyenXe: ChuyenXe[] = [];
  constructor(private http: HttpClient) { }

  getChuyenXe(): Observable<ChuyenXe[]> {
    return this.http.get<ChuyenXe[]>(this.baseUrl + 'ChuyenXe');
  }

  getSearchChuyenXe(maTD: string, ngayDi: string) {
    return this.http.get<ChuyenXe[]>(this.baseUrl + 'ChuyenXe/SearchChuyenXe/' + maTD + '/' + ngayDi);
  }
}
