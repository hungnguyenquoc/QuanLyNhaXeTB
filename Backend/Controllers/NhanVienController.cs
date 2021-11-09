using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyNhaXe.DTOS;
using QuanLyNhaXe.Models;
using QuanLyNhaXe.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QuanLyNhaXe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanVienController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly MyDbContext _conText;

        public NhanVienController(IUserService userService, MyDbContext conText)
        {
            _userService = userService;
            _conText = conText;
        }
        // GET: api/<NhanVienController>
        /// <summary>
        /// Hiển thị danh sách tài khoản nhân viên
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize]
        [Authorize(Policy = "Mức 1")]
        public async Task<IEnumerable<UserView>> Get()
        {
            return await _conText.NhanViens.Select(p => new UserView
            {
                SoDienThoai = p.SoDienThoai,
                UserName = p.MSNV,
                ChucVu=p.ChucVuUser.TenChucVu,
                HoTen = p.HoTen,
                NgaySinh = p.NgaySinh.Value.ToString("dd-MM-yyyy") //Lấy giá trị xong convert
            }).ToListAsync();
        }

        // GET api/<NhanVienController>/5
        /// <summary>
        /// Lấy thông tin nhân viên theo MSNV
        /// </summary>
        /// <param name="MSNV"></param>
        /// <returns></returns>
        [HttpGet("{MSNV}")]
        public async Task<IActionResult> Get(string MSNV)
        {

            if (MSNV == null)
                return BadRequest(error: new { message="Chưa Điền Thông Tin"});
            var rs = await _userService.GetUserByID(MSNV);
            if (rs == null)
                return BadRequest(error: new { message = $"Nhân Viên Có {MSNV} Không tồn tại" });
            return Ok(rs);
        }

        // POST api/<NhanVienController>
        /// <summary>
        /// Đăng ký tài khoản nhân viên
        /// </summary>
        /// <param name="dangKy"></param>
        /// <returns></returns>
        [Route("Dky")]
        [HttpPost]
        public async Task<IActionResult> PostAccount([FromBody] DangKy dangKy)
        {
            if (ModelState.IsValid)
            {
                var nhanVien = await _userService.DangKyNhanVien(dangKy);
                if (nhanVien != null)
                {
                    var result = await _userService.DangKyUser(nhanVien.MSNV, nhanVien);
                    if (!result) return BadRequest("Tại Sao Lại Sai");
                    return Ok(dangKy);
                }
                else
                    return BadRequest("Có điều gì đó sai sai ");
            }
            return BadRequest("Có Lỗi Đã Xảy Ra Trong Lúc Cập Nhật");
        }

        // PUT api/<NhanVienController>/5
        /// <summary>
        /// Đăng Nhập 
        /// </summary>
        /// <param name="loGin"></param>
        /// <returns></returns>
        [HttpPost("Login")]
        public async Task<IActionResult> PostLogin([FromBody] Login loGin)
        {
            if (ModelState.IsValid)
            {
                var resul = await _userService.Login(loGin);
                if (resul == null)
                    return BadRequest(error: new { message = "Tên Đăng Nhập Hoặc Mật Khẩu Không Chính Xác" });
                else
                    return Ok(resul);
            }

            return BadRequest(error: new { message = "Có Lỗi Xảy Ra Trong Dữ Liệu" });
        }
        /// <summary>
        /// Edit dữ liệu user theo MSNV
        /// </summary>
        /// <param name="MSNV"></param>
        /// <param name="editUser"></param>
        /// <returns></returns>
        [HttpPut("{MSNV}")]
        public async Task<IActionResult> PostLogin(string MSNV,[FromBody] EditUser editUser)
        {
            if (ModelState.IsValid)
            {
                var edit = await _userService.EditUser(MSNV, editUser);
                if (edit == null)
                    return BadRequest(error: new { messsage = $"Cập Nhật Nhân Viên Có {MSNV} Không Thành Công" });
                else
                {
                   await _userService.EditChucVuUser(edit);
                   return Ok($"Cập thành công nhân viên có Tên là : {edit.HoTen}");
                }    
            }
            return BadRequest(error: new { message = "Có Lỗi Xảy Ra Trong Dữ Liệu" });
        }
        /// <summary>
        /// Đổi mật khẩu của nhân viên
        /// </summary>
        /// <param name="MSNV"></param>
        /// <param name="changePass"></param>
        /// <returns></returns>
        [HttpPut("ChangePass/{MSNV}")]
        public async Task<IActionResult> PostChangePass(string MSNV, [FromBody] ChangePass changePass)
        {
            if (ModelState.IsValid)
            {
                var edit = await _userService.ChangePassWord(MSNV, changePass);
                if (!edit)
                    return BadRequest(error: new { messsage = $"Thay đổi mật khẩu không thành công" });
                else
                    return Ok("Thay đổi mật khẩu thành công");
            }

            return BadRequest(error: new { message = "Có Lỗi Xảy Ra Trong Dữ Liệu" });
        }

        // DELETE api/<NhanVienController>/5
        /// <summary>
        /// Xóa user nhân viên theo MSNV
        /// </summary>
        /// <param name="MSNV"></param>
        /// <returns></returns>
        [HttpDelete("{MSNV}")]
        public async Task<IActionResult> XoaTaiKhoan(string MSNV)
        {
            if (MSNV == null)
                return BadRequest(error: new { message = "Chưa Nhập Thông Tin" });           
            if(! await _userService.DeleteUserById(MSNV))
            {
                return BadRequest(error: new { message = "Có Lỗi Trong Quá Trình Xóa Tài Khoản" });
            }
            return Ok(new { message = $"Đã Xóa Thành Công Tài Khoản Có MSNV {MSNV}" });
        }
    }
}
