using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyNhaXe.DTOS
{
    public class InputLoaiXe
    {
        [Required]
        [Display(Name = "Tên Loại Xe ")]
        public string TenLoaiXe { get; set; }
        [Required]
        [Display(Name = "Số Tầng Trên Xe")]
        public int SoTang { get; set; }
        [Display(Name ="Tổng Số Lượng Xe")]
        public int SoLuong { get; set; }
    }
}
