using QuanLyNhaXe.DTOS;
using QuanLyNhaXe.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyNhaXe.Services
{
   public interface ILoaiXeService
    {
        Task<bool> ThemLoaiXe(InputLoaiXe inputLoaiXe);

        Task<bool> SuaLoaiXe(string MSLX, EditLoaiXe editLoaiXe);

        Task<bool> XoaLoaiXe(string MSLX);
    }
    public class LoaiXeService : ILoaiXeService
    {
        private readonly MyDbContext _myDbContext;

        public LoaiXeService(MyDbContext myDbContext)
        {
            _myDbContext = myDbContext;
        }
        /// <summary>
        /// Thêm Loại Xe
        /// </summary>
        /// <param name="inputLoaiXe"></param>
        /// <returns></returns>
        public async Task<bool> ThemLoaiXe(InputLoaiXe inputLoaiXe)
        {
            var check = _myDbContext.LoaiXes.Where(lx => lx.TenLoaiXe == inputLoaiXe.TenLoaiXe).FirstOrDefault();
            if (check != null)
                return false;
            if (inputLoaiXe == null)
                return false;
            var MsCuoi = _myDbContext.LoaiXes.Max(lx=>lx.MSLoaiXe);
            int count = Convert.ToInt32(MsCuoi.Substring(4));
            count++;
            await _myDbContext.LoaiXes.AddAsync(new LoaiXe
            {
                MSLoaiXe = $"MSLX{count}",
                TenLoaiXe = inputLoaiXe.TenLoaiXe,              
            });
            await _myDbContext.SaveChangesAsync();
            return true;
        }
        
        public async Task<bool> SuaLoaiXe(string MSLX ,EditLoaiXe editLoaiXe)
        {
            if (editLoaiXe == null)
                return false;
            var check = await _myDbContext.LoaiXes.FindAsync(MSLX);
            if (check == null)
                return false;
            check.TenLoaiXe = editLoaiXe.TenLoaiXe;
            await _myDbContext.SaveChangesAsync();
            return true;
        }
        public async Task<bool> XoaLoaiXe(string MSLX)
        {
            var check = await _myDbContext.LoaiXes.FindAsync(MSLX);
            if (check == null)
                return false;
            _myDbContext.Remove(check);
            await _myDbContext.SaveChangesAsync();
            return true;
        }
    }
}
