import { InputLoaiXe } from './../../../models/InputLoaiXe';
import { InputTuyenDuong } from './../../../models/InputTuyenDuong';
import { InputeDateTime } from './../../../models/InputeDateTime';
import { ThongKeVe } from './../../../models/ThongKeVe';
import { Component, OnInit } from '@angular/core';
import { ServerHttpService } from 'src/app/Services/server-http.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { TuyenDuong } from 'src/models/TuyenDuong';
import { LoaiXe } from 'src/models/LoaiXe';

@Component({
  selector: 'app-ThongKe',
  templateUrl: './ThongKe.component.html',
  styleUrls: ['./ThongKe.component.scss']
})
export class ThongKeComponent implements OnInit {
  TongTien:number;
  loaiXes!: LoaiXe[];
  inputLX:InputLoaiXe;
  tuyenDuongs!: TuyenDuong[];
  inputTD:InputTuyenDuong;
  PhieuXeViews:ThongKeVe[]=[];
  iputDateTime:InputeDateTime;
  kieuThongKe:number;
  thang:string;
  TheoNam: string;
  Theothang:string[]=['1','2','3','4','5','6','7','8','9','10','11','12'];
  private url='http://localhost:13730/api/TuyenDuong';
  private urlListLX='http://localhost:13730/api/LoaiXe';
  private urlNam='http://localhost:13730/api/VeXe/TheoNam';
  private urlThang='http://localhost:13730/api/VeXe/TheoThang';
  private urlTime='http://localhost:13730/api/VeXe/TheoTime';
  private urlTD='http://localhost:13730/api/VeXe/TheoTD';
  private urlLX='http://localhost:13730/api/VeXe/TheoLX';
  constructor(private rest : ServerHttpService , private router : Router ,private data : DataService) {
    this.iputDateTime=new InputeDateTime();
    this.inputTD=new InputTuyenDuong();
    this.inputLX=new InputLoaiXe();
   }
  ngOnInit() {
    this.getListTD();
    this.getListLX();
  }
  ThongKeTime(){
    this.rest.post(this.urlTime,this.iputDateTime).then(data=>{
      this.PhieuXeViews = data as ThongKeVe[];
      console.log(this.PhieuXeViews);
      this.PhieuXeViews.forEach(item=>{
        this.TongTien=item.tongTien;
      })
    }).catch(error=>{
      if(error!=null)
      {
        console.log(error);
      }
    })
  }
  ThongKeTD(){
    this.rest.post(this.urlTD,this.inputTD).then(data=>{
      this.PhieuXeViews = data as ThongKeVe[];
      console.log(this.PhieuXeViews);
      this.PhieuXeViews.forEach(item=>{
        this.TongTien=item.tongTien;
      })
    }).catch(error=>{
      if(error!=null)
      {
        console.log(error);
      }
    })
  }
  ThongKeLX(){
    this.rest.post(this.urlLX,this.inputLX).then(data=>{
      this.PhieuXeViews = data as ThongKeVe[];
      console.log(this.PhieuXeViews);
      this.PhieuXeViews.forEach(item=>{
        this.TongTien=item.tongTien;
      })
    }).catch(error=>{
      if(error!=null)
      {
        console.log(error);
      }
    })
  }
  getListTD()
  {
    this.rest.get(this.url).then(data=>{
      this.tuyenDuongs = data as TuyenDuong[];
      console.log(this.tuyenDuongs);
    }).catch(error=>{
      if(error!=null)
      {
        console.log(error);
      }
    })
  }
  getListLX()
  {
    this.rest.get(this.urlListLX).then(data=>{
      this.loaiXes = data as LoaiXe[];
      console.log(this.loaiXes);
    }).catch(error=>{
      console.log(error.message);
    })
  }
  ThongKe(){
    if(this.kieuThongKe==2)
    {
      this.rest.getListVeXEByYear(this.urlNam,this.TheoNam).then(data=>{
        this.PhieuXeViews = data as ThongKeVe[];
        console.log(this.PhieuXeViews);
        this.PhieuXeViews.forEach(item=>{
          this.TongTien=item.tongTien;
        })
      }).catch(error=>{
        if(error!=null)
        {
          console.log(error);
        }
      })
    }
    if(this.kieuThongKe==1)
    {
      this.rest.getListVeXEByMonth(this.urlThang,this.thang).then(data=>{
        this.PhieuXeViews = data as ThongKeVe[];
        console.log(this.PhieuXeViews);
        this.PhieuXeViews.forEach(item=>{
          this.TongTien=item.tongTien;
        })
      }).catch(error=>{
        if(error!=null)
        {
          console.log(error);
        }
      })
    }
    if(this.kieuThongKe==3)
    {
      this.ThongKeTime();
    }
    if(this.kieuThongKe==4)
    {
      this.ThongKeTD();
    }
    if(this.kieuThongKe==5)
    {
      this.ThongKeLX();
    }
  }
}
