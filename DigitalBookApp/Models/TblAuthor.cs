using System;
using System.Collections.Generic;

#nullable disable

namespace DigitalBookApp.Models
{
    public partial class TblAuthor
    {
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string AuthorCode { get; set; }
        public int? AuthorPhone { get; set; }
        public string AuthorEmail { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? UpdateSeq { get; set; }
    }
}
