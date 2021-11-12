using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyNhaXe.DTOS
{
    public class InputXe
    {
        [Required]
        [Display(Name ="Biển Số Xe ")]
        [StringLength(9)]
        public string BienSoXe { get; set; }
        [Required]
        [Display(Name = "Tên Loại Xe ")]
        public string TenLoaiXe { get; set; }
        [Required]
        [Display(Name = "Số Tầng Trên Xe")]
        public int SoTang { get; set; }
        [Required]
        [Display(Name = "Tổng Số Ghế Tầng Trên")]
        public int SoGheTangTren { get; set; }
        [Required]
        [Display(Name = "Tổng Số Ghế Tầng Dưới")]
        public int SoGheTangDuoi { get; set; }
    }
}
