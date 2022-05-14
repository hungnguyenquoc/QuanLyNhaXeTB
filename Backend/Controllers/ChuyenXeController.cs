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
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
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
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ChuyenXeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
