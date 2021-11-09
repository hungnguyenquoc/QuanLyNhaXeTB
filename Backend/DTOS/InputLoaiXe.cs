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
        public string TenLoaiXe { get; set; }
        [Required]
        public int SoTang { get; set; }

        public int SoLuong { get; set; }
    }
}
