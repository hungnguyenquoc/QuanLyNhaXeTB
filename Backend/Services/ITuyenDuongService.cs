using QuanLyNhaXe.DTOS;
using QuanLyNhaXe.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyNhaXe.Services
{
    public interface ITuyenDuongService
    {
        Task<bool> ThemTuyenDuong (InputTuyenDuong inputTuyenDuong) ;
    }

    public class TuyenDuongService : ITuyenDuongService
    {
        private readonly MyDbContext _context;

        public TuyenDuongService(MyDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Thêm Tuyến Đường
        /// </summary>
        /// <param name="inputTuyenDuong"></param>
        /// <returns></returns>
        public async Task<bool> ThemTuyenDuong(InputTuyenDuong inputTuyenDuong)
        {
            if (inputTuyenDuong.DiemDi == null && inputTuyenDuong.DiemDen == null)
                return false;
            var checkTD = _context.TuyenDuongs.Where(td => td.TenTD == $"{inputTuyenDuong.DiemDi} - {inputTuyenDuong.DiemDen}").FirstOrDefault();
            if (checkTD != null)
                return false;
            var MsCuoi =  _context.TuyenDuongs.Max(td=>td.MSTD);
            int count = Convert.ToInt32(MsCuoi.Substring(4));
            if (count != 0)
                count++;
            var tuyenDuong = new TuyenDuong
            {
                MSTD = $"TD00{count}",
                TenTD=$"{inputTuyenDuong.DiemDi} - {inputTuyenDuong.DiemDen}",
                DiemDen = inputTuyenDuong.DiemDen,
                DiemDi = inputTuyenDuong.DiemDi
            };
            await _context.AddAsync(tuyenDuong);
            //await _context.SaveChangesAsync();
            return true;
        }
    }
}
