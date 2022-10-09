using System;
using System.Collections.Generic;

#nullable disable

namespace DigitalBookApp.Models
{
    public partial class TblAuthorBook
    {
        public int AuthorBookId { get; set; }
        public int? AuthorId { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Publisher { get; set; }
        public string Image { get; set; }
        public int? Quantity { get; set; }
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
