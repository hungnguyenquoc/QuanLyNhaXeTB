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
        Task<bool> ThemXe(InputXe inputXe);

        Task<bool> XoaXe(string BienSo);
    }
    public class XeService : IXeService
    {
        private readonly MyDbContext _myDbContext;
        public XeService(MyDbContext myDbContext)
        {
            _myDbContext = myDbContext;
        }
        /// <summary>
        /// Thêm Xe 
        /// </summary>
        /// <param name="inputXe"></param>
        /// <returns></returns>
        public async Task<bool> ThemXe(InputXe inputXe)
        {
            if (inputXe == null)
                return false;
            var check = await _myDbContext.Xes.FindAsync(inputXe.BienSoXe);
            if (check != null)
                return false;
            var loaixe = await _myDbContext.LoaiXes.FindAsync(inputXe.TenLoaiXe);
            if (loaixe == null)
                return false;
            if (loaixe.SoTang == 1)
            {
                _myDbContext.Xes.Add(new Xe
                {
                    BienSoXe = inputXe.BienSoXe,                    
                    SoChuyenDi = 0,                  
                    MSLoaiXe = loaixe.MSLoaiXe,
                    Status = 0,
                    NgayVaoBai = DateTime.Now,
                    NgayXuatBai = null,
                });
            }
            else
            {
                _myDbContext.Xes.Add(new Xe
                {
                    BienSoXe = inputXe.BienSoXe,                  
                    SoChuyenDi = 0,
                    MSLoaiXe = loaixe.MSLoaiXe,
                    Status = 0,
                    NgayVaoBai = DateTime.Now,
                    NgayXuatBai = null
                });
            }
            loaixe.SoLuong++;
            await _myDbContext.SaveChangesAsync();
            return true;
        }
        /// <summary>
        /// Sửa Thông Tin Xe
        /// </summary>
        /// <param name="inputXe"></param>
        /// <returns></returns>       
        public async Task<bool> XoaXe(string BienSo)
        {
            if (BienSo == null)
                return false;
            var xe = await _myDbContext.Xes.FindAsync(BienSo);
            if (xe == null)
                return false;
            _myDbContext.Remove(xe);
            xe.LoaiXe.SoLuong--;
            await _myDbContext.SaveChangesAsync();
            return true;
        }

    }
}
