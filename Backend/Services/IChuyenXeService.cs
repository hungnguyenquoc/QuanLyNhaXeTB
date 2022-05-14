using QuanLyNhaXe.DTOS;
using QuanLyNhaXe.DTVS;
using QuanLyNhaXe.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyNhaXe.Services
{
    public interface IChuyenXeService
    {
        Task<MessageReponse> ThemChuyenXe(InputChuyenXe inputChuyenXe);
    }
    public class ChuyenXeService : IChuyenXeService
    {
        private readonly MyDbContext _context;

        public ChuyenXeService(MyDbContext context)
        {
            _context = context;
        }

        public async Task<MessageReponse> ThemChuyenXe (InputChuyenXe inputChuyenXe)
        {
            int count = 0;
            var msCX = _context.ChuyenXes.Select(cx => cx.MaCX).Max();
            if (msCX != null)
            {
                count = Convert.ToInt32(msCX.Substring(4));
                count++;
            }    
            if (inputChuyenXe == null)
                return new MessageReponse
                {
                    rs = false,
                    message = "Cần nhập đầy đủ thông tin để tiến hành thêm Chuyến Xe mới"
                };
            else
            {
                var td = _context.TuyenDuongs.Where(td => td.TenTD == inputChuyenXe.TenTD).FirstOrDefault();
                var lx = _context.LoaiXes.Where(lx => lx.TenLoaiXe == inputChuyenXe.TenLoaiXe).FirstOrDefault();              
                if (td == null)
                    return new MessageReponse
                    {
                        rs = false,
                        message = $"Hiện tại không có tuyến đường {inputChuyenXe.TenTD}"
                    };
                if (lx == null)
                    return new MessageReponse
                    {
                        rs = false,
                        message = $"Hiện tại không có loại xe {inputChuyenXe.TenLoaiXe}"
                    };
                var cx = new ChuyenXe
                {
                    MaCX=$"MSCX00{count}",
                    gia = inputChuyenXe.Gia,
                    NgayDi = DateTime.ParseExact(inputChuyenXe.NgayDi,"dd/MM/yyyy", null),
                    GioDi = DateTime.ParseExact(inputChuyenXe.GioDi,"HH:mm",null),
                    MaTD = td.MSTD,
                    MaLoaiXe = lx.MSLoaiXe,
                };
                await _context.AddAsync(cx);
                await _context.SaveChangesAsync();
                return new MessageReponse
                {
                    rs = true,
                    message = $"Thêm thành công chuyến xe mới"
                };
            }    
        }
    }
}
