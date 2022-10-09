using System;
using System.Collections.Generic;

#nullable disable

namespace DigitalBookApp.Models
{
    public partial class OrderBook
    {
        public int OrderId { get; set; }
        public int AuthorBookId { get; set; }
        public int UserId { get; set; }
        public string IsOrderActive { get; set; }
        public int? Amount { get; set; }
        public string CardHolderName { get; set; }
        public int? Pincode { get; set; }
        public string Address { get; set; }
        public string CardNumber { get; set; }
        public string Cvv { get; set; }
        public string PaymentMethod { get; set; }
    }
}
