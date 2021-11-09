using Microsoft.AspNetCore.Mvc;
using QuanLyNhaXe.DTOS;
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
        // GET: api/<LoaiXeController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<LoaiXeController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<LoaiXeController>
        /// <summary>
        /// Thêm Loại Xe
        /// </summary>
        /// <param name="value"></param>
        [HttpPost]
        public  IActionResult Post ([FromBody] InputLoaiXe inputLoaiXe)
        {
            if(ModelState.IsValid)
            {
                return BadRequest();
            }

            return BadRequest(error: new { message = "Có Vấn Đề Xảy Ra Khi Cập Nhật Dữ Liệu" });
        }

        // PUT api/<LoaiXeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LoaiXeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
