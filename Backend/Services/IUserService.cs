using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using QuanLyNhaXe.DTOS;
using QuanLyNhaXe.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyNhaXe.Services
{
    public interface IUserService
    {
        Task<NhanVien> DangKyNhanVien(DangKy dangKy);
        Task<bool> DangKyUser(string MSNV, NhanVien nhanVien);

        Task<string> Login(Login loGin);

        Task<UserView> GetUserByID(string MSNV);

        Task<bool> DeleteUserById(string MSNV);

        Task<NhanVien> EditUser(string MSNV, EditUser editUser);

        Task<bool> ChangePassWord(string MSNV, ChangePass changePass);

        Task<bool> EditChucVuUser(NhanVien nhanVien);
    }

    public class UserServices : IUserService
    {
        private readonly UserManager<UserIdentity> _userManager;
        private readonly SignInManager<UserIdentity> _signInManager;
        private readonly MyDbContext _myDbContext;
        private readonly IConfiguration _configuration;

        public UserServices(UserManager<UserIdentity> userManager, MyDbContext myDbContext, IConfiguration configuration, SignInManager<UserIdentity> signInManager)
        {
            _userManager = userManager;
            _myDbContext = myDbContext;
            _configuration = configuration;
            _signInManager = signInManager;
        }
        /// <summary>
        /// Đăng Ký User
        /// </summary>
        /// <param name="MSNV"></param>
        /// <param name="dangKy"></param>
        /// <returns></returns>
        public async Task<bool> DangKyUser(string MSNV, NhanVien nhanVien)
        {
            var identityUser = new UserIdentity();
            if (MSNV == null)
                return false;
            else
            {
                identityUser.UserName = MSNV;
                identityUser.MucDoTruyCap = nhanVien.ChucVuUser.MucDoTruyCap;
            }
            var result = await _userManager.CreateAsync(identityUser, nhanVien.SoDienThoai);
            if (result.Succeeded)
                return true;
            else
                return false;
        }
        /// <summary>
        /// Đăng Ký Nhân Viên
        /// </summary>
        /// <param name="dangKy"></param>
        /// <returns></returns>
        public async Task<NhanVien> DangKyNhanVien(DangKy dangKy)
        {
            var nhanVien = new NhanVien();
            var checkCV = _myDbContext.chucVuUsers.Where(cCV => cCV.TenChucVu == dangKy.ChucVu).FirstOrDefault();
            if (checkCV == null)
                return null;
            int count = _myDbContext.NhanViens.Count(nv => nv.ChucVuUser.TenChucVu == dangKy.ChucVu); // Sửa
            if (dangKy == null)
                return null;
            else
            {
                count++;
                if (count >= 10)
                {
                    nhanVien.MSNV = $"{checkCV.VietTatChucVu}0{count}";
                }
                else
                {
                    nhanVien.MSNV = $"{ checkCV.VietTatChucVu}00{count}";
                }
                nhanVien.HoTen = dangKy.HoTen;
                nhanVien.NgaySinh = DateTime.ParseExact(dangKy.NgaySinh, "dd/MM/yyyy", null);
                nhanVien.SoDienThoai = dangKy.SoDienThoai;
                nhanVien.MSChucVu = checkCV.MSChucVu; //Sửa
                await _myDbContext.AddAsync(nhanVien);
                await _myDbContext.SaveChangesAsync();
                return nhanVien;
            }
        }
        /// <summary>
        /// Đăng Nhập
        /// </summary>
        /// <param name="loGin"></param>
        /// <returns></returns>
        public async Task<string> Login(Login loGin)
        {
            var user = await _userManager.FindByNameAsync(loGin.UserName); //ADMIN001
            if (!user.UserName.Equals(loGin.UserName))
            {
                return null;
            }
            if (loGin == null)
                return null;
            if (user == null)
                return null;
            var checkpass = await _signInManager.PasswordSignInAsync(user.UserName, loGin.Password, false, false);
            if (!checkpass.Succeeded)
                return null;
            var claims = new[]
            {
                new Claim("UserName",loGin.UserName),
                new Claim("ID",user.Id)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );

            string Token = new JwtSecurityTokenHandler().WriteToken(token);
            return Token;
        }
        /// <summary>
        /// Lấy User bằng ID
        /// </summary>
        /// <param name="MSNV"></param>
        /// <returns></returns>
        public async Task<UserView> GetUserByID(string MSNV)
        {
            var result = await _myDbContext.NhanViens.FirstOrDefaultAsync(nv => nv.MSNV == MSNV);
            if (result == null)
                return null;
            var user = new UserView
            {
                UserName = result.MSNV,
                HoTen = result.HoTen,
                SoDienThoai = result.SoDienThoai,
                ChucVu = result.ChucVuUser.TenChucVu, //Sửa
                NgaySinh = result.NgaySinh.Value.ToString("dd-MM-yyyy")
            };
            return user;
        }
        /// <summary>
        /// Xóa User bằng ID
        /// </summary>
        /// <param name="MSNV"></param>
        /// <returns></returns>
        public async Task<bool> DeleteUserById(string MSNV)
        {
            var result = await _myDbContext.NhanViens.FindAsync(MSNV);
            if (result == null)
                return false;
            else
            {
                var user = await _myDbContext.Users.FirstOrDefaultAsync(nv => nv.UserName == MSNV);
                if (user == null)
                    return false;
                else
                {
                    await _userManager.DeleteAsync(user);
                    _myDbContext.NhanViens.Remove(result);
                    await _myDbContext.SaveChangesAsync();
                    return true;
                }
            }
        }
        /// <summary>
        /// Chỉnh sửa thông tin User
        /// </summary>
        /// <param name="MSNV"></param>
        /// <param name="editUser"></param>
        /// <returns></returns>
        public async Task<NhanVien> EditUser(string MSNV, EditUser editUser)
        {
            var checCk = _myDbContext.chucVuUsers.Where(cCV => cCV.TenChucVu == editUser.ChucVu).FirstOrDefault();
            if (checCk == null)
                return null;
            var result = await _myDbContext.NhanViens.FindAsync(MSNV);
            if (result == null)
                return null;
            else
            {
                if (editUser.HoTen != null)
                    result.HoTen = editUser.HoTen;
                if (editUser.ChucVu != null)
                    result.MSChucVu = checCk.MSChucVu; //Sửa
                if (editUser.SoDienThoai != null)
                    result.SoDienThoai = editUser.SoDienThoai;
                if (editUser.NgaySinh != null)
                {
                    result.NgaySinh = DateTime.ParseExact(editUser.NgaySinh, "dd/MM/yyyy", null);
                }
            }
            await _myDbContext.SaveChangesAsync();
            return result;
        }
        /// <summary>
        /// Sửa chức vụ của User khi cập nhật
        /// </summary>
        /// <param name="nhanVien"></param>
        /// <returns></returns>
        public async Task<bool> EditChucVuUser(NhanVien nhanVien)
        {
            var rs = await _userManager.FindByNameAsync(nhanVien.MSNV);
            if (rs == null)
                return false;
            rs.MucDoTruyCap = nhanVien.ChucVuUser.MucDoTruyCap;
            await _myDbContext.SaveChangesAsync();
            return true;
        }
        /// <summary>
        /// Đổi mật khẩu cho user
        /// </summary>
        /// <param name="MSNV"></param>
        /// <param name="changePass"></param>
        /// <returns></returns>
        public async Task<bool> ChangePassWord(string MSNV, ChangePass changePass)
        {
            var user = await _userManager.FindByNameAsync(MSNV);
            if (user == null)
                return false;
            if (!await _userManager.CheckPasswordAsync(user, changePass.CurrentPassWord))
                return false;
            await _userManager.ChangePasswordAsync(user, changePass.CurrentPassWord, changePass.PassWord);
            return true;
        }
    }
}
