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
    public class ChuyenXeController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly IChuyenXeService _chuyenXeService;

        public ChuyenXeController(MyDbContext context, IChuyenXeService chuyenXeService)
        {
            _context = context;
            _chuyenXeService = chuyenXeService;
        }

        // GET: api/<ChuyenXeController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ChuyenXeController>/5
        [HttpGet("{MSCX}")]
        public async Task<IActionResult> Get(string MSCX)
        {
            var cx = await _context.ChuyenXes.FindAsync(MSCX);
            if (cx == null)
                return BadRequest($"Không có chuyến xe có MSCX : {MSCX}");
            else
                return Ok(new { 
                gia=cx.gia,
                GioDi=cx.GioDi,
                NgayDi=cx.NgayDi,
                TenTuyenDuong=cx.tuyenDuong.TenTD,
                LoaiXe= cx.loaiXe.TenLoaiXe
                });
        }
        /// <summary>
        /// Thêm Chuyến Xe
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        // POST api/<ChuyenXeController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] InputChuyenXe inputChuyenXe)
        {
            if (ModelState.IsValid)
            {
                var kq = await _chuyenXeService.ThemChuyenXe(inputChuyenXe);
                if (kq.rs)
                    return Ok(kq.message);
                else
                    return BadRequest(kq.message);
            }
            else
                return BadRequest("Có lỗi xảy ra trong quá trình cập nhật dữ liệu");
        }
        // PUT api/<ChuyenXeController>/5
        [HttpPut("{MSCX}")]
        public async Task<IActionResult> Put(string MSCX, [FromBody] EditChuyenXe editChuyenXe)
        {
            if (ModelState.IsValid)
            {
                var kq = await _chuyenXeService.SuaChuyenXe(editChuyenXe, MSCX);
                if (kq.rs)
                    return Ok(kq.message);
                else
                    return BadRequest(kq.message);
            }
            else
                return BadRequest("Đã có lỗi xảy ra trong quá trình cập nhật dữ liệu");

        }

        // DELETE api/<ChuyenXeController>/5
        [HttpDelete("{MSCX}")]
        public async Task<IActionResult> Delete(string MSCX)
        {
            if (ModelState.IsValid)
            {
                var kq = await _chuyenXeService.XoaChuyenXe(MSCX);
                if (kq.rs)
                    return Ok(kq.message);
                else
                    return BadRequest(kq.message);
            }
            else
            {
                return BadRequest("Quá trình xử lý cơ sở dữ liệu bị lỗi");
            }    
        }
    }
}
