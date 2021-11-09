using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyNhaXe.Models
{
    [Table("LoaiXe")]
    public class LoaiXe
    {
        [Required]
        [Key]
        [Display(Name ="Mã Số Loại Xe")]
        public string MSLoaiXe { get; set; }
        [Required]
        [Display(Name = "Tên Loại Xe")]
        [MaxLength(30,ErrorMessage ="Tối Đa 30 Ký Tự")]
        public string TenLoaiXe { get; set; }
        [Required]
        [Display(Name = "Số Tầng Trên Xe")]
        public int SoTang { get; set; }
        [Display(Name = "Tổng Số Lượng")]
        public int SoLuong { get; set; }
        //Colect Navigate (Quan hệ nhiều) không có thay đổi gì cả
        public virtual List<Xe> Xes { get; set; }
    }
}
