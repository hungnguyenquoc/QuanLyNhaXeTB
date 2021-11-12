using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyNhaXe.Models
{
    [Table("GheXe")]
    public class GheXe
    {
        [Key]
        [Required]
        [Display(Name ="Mã Số Ghế")]
        public long MSGhe { get;set; }
        [Required]
        [Display(Name ="Vị Trí Ghế")]
        public string ViTri { get; set; }
        [Required]
        [Display(Name ="Trạng Thái Ghế")] //0 là còn trống , 1 là đã có người
        public int Status { get; set; }
        public string BienSoXe { get; set; }
        [ForeignKey("BienSoXe")]
        [Required]
        public virtual Xe Xe { get; set; } // ghế chỉ thuộc về 1 xe
    }
}
