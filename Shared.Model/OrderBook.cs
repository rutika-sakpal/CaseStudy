using System;

namespace Shared.Model
{
    public class OrderBook
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
        public string UserName { get; set; }
        public string Boarding { get; set; }
        public string Destination { get; set; }
    }
}
