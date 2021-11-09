using Castle.Core.Configuration;
using Microsoft.AspNetCore.Identity;
using QuanLyNhaXe.DTOS;
using QuanLyNhaXe.Models;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyNhaXe.Services
{
    public interface IAuthoServicecs
    {
        Task<bool> ThemChucVu(InputChucVu inputChucVu);

        Task<bool> XoaChucVu(string MSCV);

        Task<ChucVuUser> SuaChucVu(string id, EditChucVu editChucVu);
    }
    public class AuthoService : IAuthoServicecs
    {
        private readonly UserManager<UserIdentity> _userManager;
        private readonly MyDbContext _myDbContext;

        public AuthoService (UserManager<UserIdentity> userManager,MyDbContext myDbContext)
        {
            _userManager = userManager;
            _myDbContext = myDbContext;
     
        }

        public async Task<bool> ThemChucVu(InputChucVu inputChucVu)
        {
            if (inputChucVu.MucDoTruyCap == 0)
                inputChucVu.MucDoTruyCap = 1;
            if (inputChucVu == null)
                return false;
            var check = _myDbContext.chucVuUsers.Where(cv => cv.TenChucVu == inputChucVu.TenChucVu).FirstOrDefault();
            if (check != null)
                return false;
            int count = _myDbContext.chucVuUsers.Select(cv => cv.MSChucVu).Count();
            count++;
            var rs = await _myDbContext.chucVuUsers.AddAsync(new ChucVuUser
            {
                MSChucVu = $"MS00{count}",
                TenChucVu = inputChucVu.TenChucVu,
                VietTatChucVu = inputChucVu.VietTatChucVu,
                MucDoTruyCap=inputChucVu.MucDoTruyCap
            }) ;
            await _myDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> XoaChucVu(string MSCV)
        {
            if (MSCV == null)
                return false;
            var rs = await _myDbContext.chucVuUsers.FindAsync(MSCV);
            if (rs==null)
                return false;
            _myDbContext.chucVuUsers.Remove(rs);
            await _myDbContext.SaveChangesAsync();
            return true;
        }
        public async Task<ChucVuUser> SuaChucVu(string id, EditChucVu editchucVu)
        {
            int tempCv;
            if (id == null || editchucVu == null)
                return null;
            var rs = await _myDbContext.chucVuUsers.FindAsync(id);
            if (rs == null)
                return null;
            if (editchucVu.TenChucVu != null)
                rs.TenChucVu = editchucVu.TenChucVu;
            if (editchucVu.VietTatChucVu != null)
                rs.VietTatChucVu = editchucVu.VietTatChucVu;
            if(editchucVu.MucDoTruyCap>0 || editchucVu.MucDoTruyCap < 3)
            {
                tempCv = editchucVu.MucDoTruyCap;
                rs.MucDoTruyCap = editchucVu.MucDoTruyCap;
            }
            else
            {
                tempCv = 3;
                rs.MucDoTruyCap = 3;
            }    
               await _myDbContext.SaveChangesAsync();
            if (!SuaChucVuUser(rs.MSChucVu,tempCv))
                return null;
            return rs;
        }

        public bool SuaChucVuUser(string MSCV,int tempCv)
        {
            if (tempCv == -1)
                return false;
            var nv = _myDbContext.NhanViens.Where(nv => nv.MSChucVu == MSCV).ToList();
            if (nv == null)
                return false;
            foreach (var iteam in nv)
            {
                var user = _userManager.FindByNameAsync(iteam.MSNV);
                {
                    user.Result.MucDoTruyCap = iteam.ChucVuUser.MucDoTruyCap;
                }
            }
            _myDbContext.SaveChanges();
            return true;
        }
    }
}
