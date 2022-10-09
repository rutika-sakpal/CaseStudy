using DigitalBookApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalBookApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReaderController : ControllerBase
    {
        DigitalBookDBContext db = new DigitalBookDBContext();


        [HttpPost]
        [Route("SearchAllBooks")]
        public IEnumerable<TblAuthorBook> SearchAllBooks(string title,string publisher)
        {
            List<TblAuthorBook> allAuthorBooks = db.TblAuthorBooks.Where(x => x.Title.Contains(title) || x.Publisher.Contains(publisher)).ToList();
            return allAuthorBooks;
        }
        /// <summary>
        /// Get selected book to display
        /// </summary>
        /// <param name="authorBookId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAuthorBookByAuthorBookID")]
        public IEnumerable<TblAuthorBook> GetAuthorBookByAuthorBookID(int authorBookId)
        {

            var authorList = db.TblAuthorBooks.Where(x => x.IsActive == "Y" && x.IsDeleted == "N" && x.AuthorBookId == Convert.ToInt32(authorBookId)).ToList();
            return authorList;
        }
    }
}
