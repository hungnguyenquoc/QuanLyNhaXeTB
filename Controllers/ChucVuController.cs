using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuanLyNhaXe.DTOS;
using QuanLyNhaXe.Models;
using QuanLyNhaXe.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QuanLyNhaXe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChucVuController : ControllerBase
    {
        private readonly IAuthoServicecs _authoServices;
        private readonly MyDbContext _myDbContext;
        public ChucVuController(IAuthoServicecs authoServices, MyDbContext myDbContext)
        {
            _authoServices = authoServices;
            _myDbContext = myDbContext;
        }

        // GET: api/<ChucVuController>
        /// <summary>
        /// Xuất Ra List Chức Năng
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize]
        [Authorize(Policy ="Mức 1")]
        public IEnumerable<ChucVuUser> Get()
        {
            return _myDbContext.chucVuUsers.Select(p => new ChucVuUser
            {
                MSChucVu = p.MSChucVu,
                TenChucVu = p.TenChucVu,
                VietTatChucVu = p.VietTatChucVu,
                MucDoTruyCap = p.MucDoTruyCap
            }).ToList();
        }
        // POST api/<ChucVuController>
        /// <summary>
        /// Thêm Chức Vụ
        /// </summary>
        /// <param name="value"></param>
        [HttpPost]
        //[Authorize]
        //[Authorize(Policy = "Mức 1")]
        public async Task<IActionResult> ThemChucVu([FromBody] InputChucVu inputChucVu)
        {
            if(ModelState.IsValid)
            {
                var resul = await _authoServices.ThemChucVu(inputChucVu);
                if (!resul)
                    return BadRequest(error: new { message = "Thêm không thành công vì có thể đã có chức vụ này" });
                else
                    return Ok($"Thêm thành công chức vụ {inputChucVu.TenChucVu}");
            }
            return BadRequest(error: new { message = $"Thêm mới chức vụ {inputChucVu.TenChucVu} không thành công" });
        }

        // PUT api/<ChucVuController>/5
        /// <summary>
        /// Sửa Chức Vụ Theo MSCV
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        [HttpPut("{MSCV}")]
        public async Task<IActionResult> SuaChucVu(string MSCV, [FromBody] EditChucVu edittChucVu)
        {
            if(ModelState.IsValid)
            {
                var rs=await _authoServices.SuaChucVu(MSCV, edittChucVu);
                if (rs == null)
                    return BadRequest(error: new { message = $"Cập Nhật Không Thành Công {edittChucVu.TenChucVu}" });
                else
                {
                    return Ok($"Cập Nhật Thành Công Chức Vụ Có Tên là: {rs.TenChucVu}");
                }
            }
            return BadRequest(error: new { message = $"Cập Nhật Không Thành Công {edittChucVu.TenChucVu}" });
        }

        // DELETE api/<ChucVuController>/5
        /// <summary>
        /// Xóa Chức Năng
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> XoaChucNang(string id)
        {
            if(ModelState.IsValid)
            {
                await _authoServices.XoaChucVu(id);
                return Ok($"Xóa Thành Công Chức Vụ Có MSCV = {id} ");
            }
            return BadRequest(error: new { message = "Có Lỗi Xảy Ra Khi Thực Hiện Chức Năng Này" });
        }
    }
}
