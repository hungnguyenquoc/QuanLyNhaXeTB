import { PhieuVeXe } from './../../../models/PhieuVeXe';
import { VeXe } from './../../../models/VeXe';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { ServerHttpService } from 'src/app/Services/server-http.service';
import * as docx from "docx";
import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun , HeadingLevel,AlignmentType } from "docx";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-FormVeXeView',
  templateUrl: './FormVeXeView.component.html',
  styleUrls: ['./FormVeXeView.component.scss']
})
export class FormVeXeViewComponent implements OnInit {
  PhieuVeXes:PhieuVeXe[] = [];
  SDT:string;
  private url='http://localhost:13730/api/VeXe/InVe'
  constructor(private rest : ServerHttpService ,private data : DataService , private route : Router) { }

  ngOnInit() {
  }
  getListVeXe(){
    this.rest.getListVeXE(this.url,this.SDT).then(data=>{
      this.PhieuVeXes = data as PhieuVeXe[];
      console.log(this.PhieuVeXes);
    }).catch(error=>{
      if(error!=null)
      {
        console.log(error);
      }
    })
  }
  public InPhieu(VeXe:PhieuVeXe): void {
    const doc = new Document({
      sections: [{
          properties: {},
          children: [
              new Paragraph({
                text: "Vé Xe Khách Hàng",
                alignment: AlignmentType.CENTER,
                heading:HeadingLevel.TITLE,
               
              }),
              new Paragraph({
                text: 'Tên Khách Hàng:'+VeXe.tenKH,
                heading:HeadingLevel.HEADING_3,

              }),
              new Paragraph({
                text: 'Tuyến Đường:'+VeXe.tuyenDuong,
                heading:HeadingLevel.HEADING_3,

              }),
              new Paragraph({
                text: 'Loại Xe:'+VeXe.tenLoaiXe,
                heading:HeadingLevel.HEADING_3,

              }),
              new Paragraph({
                text: 'Biển Số Xe:'+VeXe.bsxe,
                heading:HeadingLevel.HEADING_3,

              }),
              new Paragraph({
                text: "Ngày Đi:"+VeXe.ngayDi,
                heading:HeadingLevel.HEADING_3,

              }),
              new Paragraph({
                text: "Giờ Đi:"+VeXe.gioDi,
                heading:HeadingLevel.HEADING_3,

              }),
              new Paragraph({
                text: "Số Ghế:"+VeXe.soGhe,
                heading:HeadingLevel.HEADING_3,

              }),
          ],
      }],
  });

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      FileSaver.saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }
}
