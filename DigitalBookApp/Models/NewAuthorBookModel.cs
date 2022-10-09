using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalBookApp.Models
{
    public class NewAuthorBookModel
    {
        public int AuthorBookId { get; set; }
        public int? AuthorId { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Publisher { get; set; }
        public IFormFile Image { get; set; }
        public int? Price { get; set; }
        public string IsActive { get; set; }
        public string BookContent { get; set; }
        public string IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public int? UpdateSeq { get; set; }
    }
}
