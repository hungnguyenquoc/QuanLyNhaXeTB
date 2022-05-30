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
    public class XeController : ControllerBase
    {
        private readonly IXeService _xeService;
        private readonly MyDbContext _conText;
        public XeController(IXeService xeService, MyDbContext myDbContext)
        {
            _xeService=xeService;
            _conText=myDbContext;
        }


        // GET: api/<XeController>
        [HttpGet]
        public IEnumerable<Xe> Get()
        {
            return _conText.Xes.Select(xe => new Xe
            {
                BienSoXe=xe.BienSoXe,
                NgayVaoBai=xe.NgayVaoBai,
                SoChuyenDi=xe.SoChuyenDi,
                LoaiXe=xe.LoaiXe
            }).ToList();
        }

        // GET api/<XeController>/5
        [HttpGet("{BSXE}")]
        public async Task<IActionResult> Get(string BSXE)
        {
            if (BSXE == null)
                return BadRequest(error: new { message = "Vui lòng nhập BSXE để tìm kiếm" });
            var rs = await _conText.Xes.FindAsync(BSXE);
            if (rs == null)
                return BadRequest(error: new { message = $"Không tìm thấy thông tin có Biển Số là : {BSXE}" });
            else
                return Ok(rs);
        }

        // POST api/<XeController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] InputXe inputXe)
        {
            if (ModelState.IsValid)
            {
                var rs = await _xeService.ThemXe(inputXe);
                if (rs)
                    return Ok($"Thêm thành công xe có thông tin \n {inputXe.BienSoXe} , {inputXe.TenLoaiXe} ");
                else
                    return BadRequest(" Thêm xe mới không thành công ");
            }
            return BadRequest(error: new { message = "Có Vấn Đề Xảy Ra Khi Cập Nhật Dữ Liệu" });
        }
        // PUT api/<XeController>/5
        [HttpPut("{BSXE}")]
        public async Task<IActionResult> Put(string BSXE ,[FromBody] Editxe editxe)
        {
            if (ModelState.IsValid)
            {
                var rs = await _xeService.SuaXe(BSXE,editxe);
                if (rs)
                    return Ok($"Sửa thông tin xe có biển số : {BSXE} thành công ");
                else
                    return BadRequest($" Sửa thông tin xe với biển số : {BSXE} không thành công ");
            }
            return BadRequest(error: new { message = "Có Vấn Đề Xảy Ra Khi Cập Nhật Dữ Liệu" });
        }
        // DELETE api/<XeController>/5
        [HttpDelete("{BSXE}")]
        public async Task<IActionResult> Delete(string BSXE)
        {
            if (BSXE == null)
                return BadRequest(error: new { message = "Vui lòng nhập biển số xe " });
            var check = await _xeService.XoaXe(BSXE);
            if (!check)
                return BadRequest(error: new { message = $"Khống có xe nào có biển số là : {BSXE}" });
            else
                return Ok(new { message = $" Xóa xe có biển số là : {BSXE} thành công " });
        }
    }
}
