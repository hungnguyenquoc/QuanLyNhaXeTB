using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyNhaXe.Models
{
    public class UserIdentity:IdentityUser
    {
        public int MucDoTruyCap { get; set; }
        public virtual NhanVien NhanVien { get; set; }
    }
}
