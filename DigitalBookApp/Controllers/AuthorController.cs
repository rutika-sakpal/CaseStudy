using DigitalBookApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DigitalBookApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]

    public class AuthorController : ControllerBase
    {
        DigitalBookDBContext db;

        public AuthorController(DigitalBookDBContext _db)
        {
            db = _db;
        }


        [HttpGet]
        [Route("GetAllAuthorBook")]
        public IEnumerable<TblAuthorBook> GetAllAuthorBook()
        {
            var authorList = db.TblAuthorBooks.Where(x => x.IsDeleted == "N" ).ToList();
            foreach (var item in authorList)
            {
                if(item.IsActive=="Y")
                {
                    item.IsActive = "Yes";

                }
                else
                {
                    item.IsActive = "No";
                }
            }
            return authorList;
                   
        }
        /// <summary>
        /// Get all books by author ID
        /// </summary>
        /// <param name="authorId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllAuthorBookByAuthorID")]
        public IEnumerable<TblAuthorBook> GetAllAuthorBookByAuthorID(string authorId)
        {

            var authorList = db.TblAuthorBooks.Where(x => x.IsActive == "Y" && x.IsDeleted=="N" && x.AuthorId == Convert.ToInt32(authorId)).ToList();
            return authorList;
        }
        [HttpPost]
        [Route("SaveAuthorBook")]
        public IActionResult SaveAuthorBook([FromForm] NewAuthorBookModel authorBook)
        {
            TblAuthorBook createAuthorBook = new TblAuthorBook();
            string name = Convert.ToString(User.Claims.Where(c => c.Type == ClaimTypes.Name).First().Value);
                createAuthorBook.AuthorId= Convert.ToInt32(User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).First().Value);

            var file = Request.Form.Files[0];
            var foldername = "Images";
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), foldername);
            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                //fileName = fileName +"_"+DateTime.Now.ToString("yyyyMMddHHmmssfff");

                var extension = Path.GetExtension(fileName);
                var newFileName = fileName.Replace(extension, DateTime.Now.ToString("yyyyMMddHHmmssfff")) + extension;

                var fullPath = Path.Combine(pathToSave, newFileName);
                var dbPath = Path.Combine(foldername, newFileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                createAuthorBook.Image = dbPath;             
            }
            else
            {
                return BadRequest();
            }
            if(authorBook.IsActive.ToLower() =="yes")
            {
                createAuthorBook.IsActive= authorBook.IsActive = "Y";
            }
            else
            {
                createAuthorBook.IsActive = authorBook.IsActive = "N";
            }
            createAuthorBook.Title = authorBook.Title;
            createAuthorBook.Publisher = authorBook.Publisher;
            createAuthorBook.Category = authorBook.Category;
            createAuthorBook.BookContent = authorBook.BookContent;
            createAuthorBook.Price = Convert.ToInt32(authorBook.Price);
            createAuthorBook.IsDeleted = "N";
            createAuthorBook.CreatedBy = "admin"   ;
            createAuthorBook.CreatedDate = DateTime.Now;
            createAuthorBook.ModifiedBy = "admin";
            createAuthorBook.ModifiedDate = DateTime.Now;
            db.TblAuthorBooks.Add(createAuthorBook);
            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }
        [HttpPut]
        [Route("UpdateAuthorBook")]
        public IActionResult UpdateAuthorBook([FromForm] NewAuthorBookModel authorBook)
        {
            var editauthor = db.TblAuthorBooks.Where(x => x.AuthorBookId == Convert.ToInt32(authorBook.AuthorBookId)).FirstOrDefault();

            var file = Request.Form.Files[0];
            var foldername = "Images";
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), foldername);
            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                //fileName = fileName +"_"+DateTime.Now.ToString("yyyyMMddHHmmssfff");

                var extension = Path.GetExtension(fileName);
                var newFileName = fileName.Replace(extension, DateTime.Now.ToString("yyyyMMddHHmmssfff")) + extension;

                var fullPath = Path.Combine(pathToSave, newFileName);
                var dbPath = Path.Combine(foldername, newFileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                editauthor.Image = dbPath;
            }
            else
            {
                return BadRequest();
            }
            if (editauthor.IsActive.ToLower() == "yes")
            {
                editauthor.IsActive = "Y";
            }
            else
            {
                editauthor.IsActive = "N";
            }
            editauthor.Price = Convert.ToInt32(authorBook.Price);
            editauthor.ModifiedBy = "admin";
            editauthor.ModifiedDate = DateTime.Now;
            db.TblAuthorBooks.Update(editauthor);
            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }

        [HttpDelete]
        [Route("DeleteAuthorBook")]
        public IActionResult DeleteAuthorBook(int authorBookId)
        {
            var data = db.TblAuthorBooks.Where(x => x.AuthorBookId == authorBookId).FirstOrDefault();
            data.IsDeleted = "Y";
            data.ModifiedBy = "admin";
            data.ModifiedDate = DateTime.Now;
            db.TblAuthorBooks.Update(data);
            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }
        [HttpPut]
        [Route("BlockAuthorBook")]
        public IActionResult BlockAuthorBook([FromBody] int authorBookId)
        {
            var data = db.TblAuthorBooks.Where(x => x.AuthorBookId == authorBookId).FirstOrDefault();
            data.IsActive = "N";
            data.ModifiedBy = "admin";
            data.ModifiedDate = DateTime.Now;
            db.TblAuthorBooks.Update(data);
            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }
        [HttpPut]
        [Route("UnBlockAuthorBook")]
        public IActionResult UnBlockAuthorBook([FromBody] int authorBookId)
        {
            var data = db.TblAuthorBooks.Where(x => x.AuthorBookId == authorBookId).FirstOrDefault();
            data.IsActive = "Y";
            data.ModifiedBy = "admin";
            data.ModifiedDate = DateTime.Now;
            db.TblAuthorBooks.Update(data);
            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }
    }
}
