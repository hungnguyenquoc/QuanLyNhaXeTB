﻿using System;
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
    }
}
