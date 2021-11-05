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
    public class LoaiXeController : ControllerBase
    {
        private readonly ILoaiXeService _loaiXeService;
        private readonly MyDbContext _myDbConText;
        public LoaiXeController(ILoaiXeService loaiXeService, MyDbContext myDbContext)
        {
            _loaiXeService = loaiXeService;
            _myDbConText = myDbContext;
        }
        // GET: api/<LoaiXeController>
        [HttpGet]
        public IEnumerable<LoaiXe> DanhSachLoaiXe()
        {
            return _myDbConText.LoaiXes.Select(lx => new LoaiXe
            {
                MSLoaiXe = lx.MSLoaiXe,
                TenLoaiXe = lx.TenLoaiXe,    
                SoLuong = lx.SoLuong
            }).ToList();
        }

        // GET api/<LoaiXeController>/5
        [HttpGet("{MSLX}")]
        public async Task<IActionResult> Get (string MSLX)
        {
            if (MSLX == null)
                return BadRequest(error: new { message = $" Chưa nhập MSLX đề tìm kiếm " });
            var rs = await _myDbConText.LoaiXes.FindAsync(MSLX);
            if (rs == null)
                return BadRequest(error: new { message = $"Không lấy được thông tin loai xe có MSLX: {MSLX}" });
            else
                return Ok(rs);
        }

        // POST api/<LoaiXeController>
        /// <summary>
        /// Thêm Loại Xe
        /// </summary>
        /// <param name="value"></param>
        [HttpPost]
        public async Task<IActionResult> ThemLoaiXe ([FromBody] InputLoaiXe inputLoaiXe)
        {
            if(ModelState.IsValid)
            {
                var rs = await _loaiXeService.ThemLoaiXe(inputLoaiXe);
                if (rs)
                    return Ok($"Thêm thành công loại xe có tên {inputLoaiXe.TenLoaiXe} ");
                else
                    return BadRequest($" Thêm không thành công loại xe có tên {inputLoaiXe.TenLoaiXe} ");
            }
            return BadRequest(error: new { message = "Có Vấn Đề Xảy Ra Khi Cập Nhật Dữ Liệu" });
        }

        // PUT api/<LoaiXeController>/5
        /// <summary>
        /// Sửa loại xe 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        [HttpPut("{MSLX}")]
        public async Task<IActionResult> SuaLoaiXe (string MSLX, [FromBody] EditLoaiXe editLoaiXe)
        {
            if(ModelState.IsValid)
            {
                var rs = await _loaiXeService.SuaLoaiXe(MSLX, editLoaiXe);
                if (rs)
                    return Ok($"Cập thành công loại xe có tên: {editLoaiXe.TenLoaiXe}");
                else
                    return BadRequest($"Cập nhật không thành công loại xe có tên: {editLoaiXe.TenLoaiXe}");
            }
            return BadRequest(error: new { message = "Có vấn đề xảy ra khi cập nhật dữ liệu" });
        }

        // DELETE api/<LoaiXeController>/5
        /// <summary>
        /// Xóa loại xe
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{MSLX}")]
        public async Task<IActionResult> XoaLoaiXe(string MSLX)
        {
            if(ModelState.IsValid)
            {
                await _loaiXeService.XoaLoaiXe(MSLX);
                return Ok($"Xóa loại xe có tên {MSLX}");
            }
            return BadRequest(error: new { message = "Dữ liệu cập nhật không thành công" });
        }
    }
}
