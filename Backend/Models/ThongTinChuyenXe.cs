using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyNhaXe.Models
{
    [Table("ThongTinChuyenXe")]
    public class ThongTinChuyenXe
    {
        [Key]
        [Required]
        [Display(Name ="Mã Số Thông Tin Chuyến Xe")]
        public string MaSoTT { get; set; }
        [Required]
        [Display(Name ="Mã Chuyễn Xe")] // Khóa Ngoại của bảng ChuyenXe
        public string MaCx { get; set; }
        [Required]
        [Display(Name = "Biển Số Xe")] 
        public string BienSoXe { get; set; } // Khóa ngoại của bảng Xe
        [Required]
        [Display(Name = "Mã Số Tài Xế")] 
        public string MsTX { get; set; } // Khóa ngoại của bảng NhanVien (NhanVien=TaiXe)
        [ForeignKey("MsTX")]
        public virtual NhanVien nhanVien { get; set; }
        [ForeignKey("MaCx")]
        public virtual ChuyenXe  chuyenXe { get; set; }
        [ForeignKey("BienSoXe")]
        public virtual Xe xe { get; set; }



    }
}
