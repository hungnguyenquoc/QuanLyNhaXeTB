import { Component, OnInit } from '@angular/core';
import { TuyenDuong } from '../../models/TuyenDuong';
import { RoutesSearchParams } from '../../models/routesSearchParams';
import { RoutesSearchService } from '../../services/routes-search.service';
import { ChuyenXeService } from '../../services/chuyen-xe.service';
import { ChuyenXe } from '../../models/ChuyenXe';

@Component({
  selector: 'app-routes',
  templateUrl: './routes-search.component.html',
  styleUrls: ['./routes-search.component.css']
})
export class RoutesSearchComponent implements OnInit {
  tuyenDuong!: TuyenDuong[];
  chuyenXe!: ChuyenXe[];
  routesSearchParams!: RoutesSearchParams;

  constructor(private routesSearchService: RoutesSearchService, private chuyenXeService: ChuyenXeService) {
    this.routesSearchParams = this.routesSearchService.getShopParams();
  }

  ngOnInit(): void {
    this.getRoutes();
    this.getChuyenXe();

  }
  getChuyenXe() {
    this.chuyenXeService.getChuyenXe()
    .subscribe(data => {
      this.chuyenXe = data;
      console.log('data', data);
   })
  }

  getRoutes() {
    this.routesSearchService.getRoutes()
    .subscribe(data => {
      this.tuyenDuong = data;
      console.log('data', data);
   })
  }

  getDataTuyenDuong(maTD: string) {
    const findedData = this.chuyenXe.find( x => x.maTD == maTD);
    console.log('ddd', findedData);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData;
  }
  layThongTinNgayDi (ngayDi: Date) {

    const findedData = this.chuyenXe.find( x => x.ngayDi == ngayDi);
    console.log('dddq', findedData);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData;
  }

  parseDate(dateString: Date)  {
    if (dateString) {
        return new Date(dateString);
    }
    return dateString;
}
  // onRoutesSelected(mstd: number) {
  //   const params = this.routesSearchService.getShopParams();
  //   params.mstd = mstd;
  //   this.routesSearchService.setShopParams(params);
  //   this.getRoutes();
  // }
}
