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
        public int SoTang { get; set; }
        [Required]
        public int TongSoGhe { get; set; }
    }
}
