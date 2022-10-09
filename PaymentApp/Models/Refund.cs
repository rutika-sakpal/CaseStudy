using System;
using System.Collections.Generic;

#nullable disable

namespace PaymentApp.Models
{
    public partial class Refund
    {
        public int RefundId { get; set; }
        public int OrderId { get; set; }
        public int? RefundAmount { get; set; }
        public int? UserId { get; set; }
    }
}
