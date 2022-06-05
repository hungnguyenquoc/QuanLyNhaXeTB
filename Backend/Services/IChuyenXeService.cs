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

        Task<MessageReponse> SuaChuyenXe(EditChuyenXe editChuyenXe, string MSCX);

        Task<MessageReponse> XoaChuyenXe(string MSCX);

        IEnumerable<ChuyenXeView> SearchChuyenXe(string maTD, string ngayDi,string tenLX);
    }
    public class ChuyenXeService : IChuyenXeService
    {
        private readonly MyDbContext _context;

        public ChuyenXeService(MyDbContext context)
        {
            _context = context;
        }

        public async Task<MessageReponse> ThemChuyenXe(InputChuyenXe inputChuyenXe)
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
                    MaCX = $"MSCX00{count}",
                    gia = inputChuyenXe.Gia,
                    NgayDi = DateTime.ParseExact(inputChuyenXe.NgayDi, "yyyy-MM-dd", null),
                    GioDi = DateTime.ParseExact(inputChuyenXe.GioDi, "HH:mm", null),
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
        public async Task<MessageReponse> SuaChuyenXe(EditChuyenXe editChuyenXe, string MSCX)
        {
            if (editChuyenXe == null)
                return new MessageReponse
                {
                    rs = false,
                    message = "Cần nhập thông tin để tiến hành cập nhật"
                };
            else
            {
                var cx = await _context.ChuyenXes.FindAsync(MSCX);
                var lx = _context.LoaiXes.Where(lx => lx.TenLoaiXe == editChuyenXe.TenLX).FirstOrDefault();
                var td = _context.TuyenDuongs.Where(td => td.TenTD == editChuyenXe.TenTD).FirstOrDefault();
                if (cx == null)
                    return new MessageReponse
                    {
                        rs = false,
                        message = $"Hiện không tồn tại chuyến xe có MSCX : {MSCX}"
                    };
                if (lx != null)
                    cx.MaLoaiXe = lx.MSLoaiXe;
                if (td != null)
                    cx.MaTD = td.MSTD;
                if (editChuyenXe.Gia != null)
                    cx.gia = editChuyenXe.Gia;
                if (editChuyenXe.GioDi != null)
                    cx.GioDi = DateTime.ParseExact(editChuyenXe.GioDi, "yyyy-MM-dd", null);
                if (editChuyenXe.NgayDi != null)
                    cx.NgayDi = DateTime.ParseExact(editChuyenXe.NgayDi, "HH:mm", null);
                await _context.SaveChangesAsync();
                return new MessageReponse
                {
                    rs = true,
                    message = $"Cập nhật thông tin mới thành công cho chuyên xe có MSCX là {MSCX}"
                };
            }
        }
        public async Task<MessageReponse> XoaChuyenXe(string MSCX)
        {
            if (MSCX == null)
                return new MessageReponse
                {
                    rs = false,
                    message = "Cần nhập thông tin đầy đủ để tiến hành xóa dữ liệu"
                };
            var cx = await _context.ChuyenXes.FindAsync(MSCX);
            if (cx != null)
            {
                _context.ChuyenXes.Remove(cx);
                await _context.SaveChangesAsync();
                return new MessageReponse
                {
                    rs = true,
                    message = $"Xóa thành công chuyến xe có MSCX : {MSCX}"
                };
            }
            else
            {
                return new MessageReponse
                {
                    rs = false,
                    message = $"Thông tin chuyến xe có MSCX : {MSCX} không tồn tại nên không thể xóa dữ liệu"
                };
            }
        }
        //search data
        public IEnumerable<ChuyenXeView> SearchChuyenXe(string maTD, string ngayDi,string tenLX)
        {
            DateTime ngayDi1;
            if (DateTime.TryParse(ngayDi, out DateTime Temp) == true)
            {
                ngayDi1 = DateTime.ParseExact(ngayDi, "yyyy-MM-dd", null);
            }
            else
            {
                return null;
            }
            List<ChuyenXeView> MyList = new List<ChuyenXeView>();
            var data = _context.ChuyenXes.Where(cx => cx.MaTD == maTD && DateTime.Compare(cx.NgayDi.Date,ngayDi1.Date) == 0 && cx.loaiXe.TenLoaiXe.Equals(tenLX)).ToList();
            foreach (var item in data)
            {
                MyList.Add(new ChuyenXeView
                {
                    Gia = item.gia,
                    NgayDi = item.NgayDi.ToShortDateString(),
                    GioDi = item.GioDi.ToShortTimeString(),
                    TenLX = item.loaiXe.TenLoaiXe,
                    TenTD = item.tuyenDuong.TenTD
                });
            }
            if (MyList.Count <= 0)
                return null;
            return MyList;
        }
    }
}
