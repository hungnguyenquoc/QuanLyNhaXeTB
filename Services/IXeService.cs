using QuanLyNhaXe.DTOS;
using QuanLyNhaXe.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyNhaXe.Services
{
    public interface IXeService
    {

    }
    public class XeService : IXeService
    {
        private readonly MyDbContext _myDbContext;
        public XeService(MyDbContext myDbContext)
        {
            _myDbContext = myDbContext;
        }
        //public async Task<bool> ThemXe(InputXe inputXe)
        //{
        //    if (inputXe == null)
        //        return false;
        //    var check = await _myDbContext.Xes.FindAsync(inputXe.BienSoXe);
        //    if (check != null)
        //        return false;
        //    Xe xe = new Xe();
        //    if(xe.SoTang==2)
        //}
    }
}
