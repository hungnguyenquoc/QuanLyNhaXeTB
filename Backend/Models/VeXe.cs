using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyNhaXe.Models
{
    [Table("VeXe")]
    public class Vexe
    {
        [Key]
        [Display(Name ="Mã Số Vé Xe")]
        [Required]
        public long MsVe { get; set; }
        [Required]
        [Display(Name ="Số Ghế")]
        public string soGhe { get; set; }
        [Required]
        [Display(Name ="Tình Trạng Thanh Toán")]
        public int ThanhToan { get; set; } // 0 là chưa , 1 là đã thanh toán
        [Required]
        [Display(Name = "Tên Khách Hàng")]
        public string tenKH { get; set; }
        [DataType(DataType.PhoneNumber)]
        [Required]
        [Display(Name ="Số Điện Thoại")]
        public string SDT { get; set; }
        [Required]
        [Display(Name = "Ngày Sinh Khách Hàng")]
        public int NgaySinhKH { get; set; }
        public DateTime ? NgayVe { get; set; }
        [Display(Name ="Khứ Hồi")]
        public bool isRoundTrip { get; set; }

        public virtual ChuyenXe chuyenXe { get; set; }
    }
}
