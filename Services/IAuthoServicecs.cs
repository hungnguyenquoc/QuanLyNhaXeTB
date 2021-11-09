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
        private UserManager<UserIdentity> _userManager;
        private readonly SignInManager<UserIdentity> _signInManager;
        private readonly MyDbContext _myDbContext;

        public AuthoService (UserManager<UserIdentity> userManager,SignInManager<UserIdentity> signInManager,MyDbContext myDbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
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
            int i=-1;
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
                i=rs.MucDoTruyCap;
                rs.MucDoTruyCap = editchucVu.MucDoTruyCap;
            }
            if (!SuaChucVuUser(i, editchucVu.MucDoTruyCap))
                return null;
               await _myDbContext.SaveChangesAsync();
            return rs;
        }

        public bool SuaChucVuUser(int MucDoTruyCap, int newUpdate)
        {
            var rs = _myDbContext.Users.Where(us => us.MucDoTruyCap == MucDoTruyCap).ToList();
            if (rs == null)
                return false;
            foreach(var iteam in rs)
            {
                iteam.MucDoTruyCap = newUpdate;
            }
            _myDbContext.SaveChanges();
            return true;
        }
    }
}
