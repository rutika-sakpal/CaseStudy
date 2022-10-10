using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentApp.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PaymentApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        DigitalBookDBContext db;

        public PaymentController(DigitalBookDBContext _db)
        {
            db = _db;
        }

        [HttpGet]
        [Route("GetAllReaderOrdersById")]
        public IEnumerable GetAllReaderOrdersById(int userId)
        {
            var orderList = (from ab in db.TblAuthorBooks                          
                        join o in db.OrderBooks on ab.AuthorBookId equals o.AuthorBookId
                        where (o.UserId == userId)
                        select new
                        {
                            orderId=o.OrderId,
                            userId = o.UserId,
                            title = ab.Title,
                            cardHolderName = o.CardHolderName,
                            Amount = o.Amount,
                            isOrderActive = o.IsOrderActive,
                            paymentMethod = o.PaymentMethod =="card"?"Debit Card":"Cash On Delivery"

                        }).ToList();
            //var orderList = db.OrderBooks.Where(x =>x.UserId==userId).ToList();          
            return orderList;

        }

        [HttpGet]
        [Route("GetOrderByOrderId")]
        public IEnumerable GetOrderByOrderId(int orderId)
        {
            var orderList = (from ab in db.TblAuthorBooks
                             join o in db.OrderBooks on ab.AuthorBookId equals o.AuthorBookId
                             where (o.OrderId == orderId)
                             select new
                             {
                                 image=ab.Image,
                                 orderId = o.OrderId,
                                 userId = o.UserId,
                                 title = ab.Title,
                                 cardHolderName = o.CardHolderName,
                                 Amount = o.Amount,
                                 isOrderActive = o.IsOrderActive,
                                 paymentMethod = o.PaymentMethod == "card" ? "Debit Card" : "Cash On Delivery"

                             }).ToList();
            //var orderList = db.OrderBooks.Where(x =>x.UserId==userId).ToList();          
            return orderList;

        }

        [HttpPost]
        [Route("SaveBookOrder")]
        public IActionResult SaveBookOrder([FromBody] OrderBook orderBook)
        {
            OrderBook createAuthorBook = new OrderBook();
            //string name = Convert.ToString(User.Claims.Where(c => c.Type == ClaimTypes.Name).First().Value);
            // createAuthorBook.AuthorId = Convert.ToInt32(User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).First().Value);
            orderBook.AuthorBookId = Convert.ToInt32(orderBook.AuthorBookId);
            orderBook.UserId = Convert.ToInt32(orderBook.UserId);
            orderBook.CardHolderName = orderBook.CardHolderName;
            orderBook.CardNumber = orderBook.CardNumber;
            orderBook.Cvv = orderBook.Cvv;
            orderBook.PaymentMethod = orderBook.PaymentMethod;
            orderBook.Amount = Convert.ToInt32(orderBook.Amount);
            orderBook.IsOrderActive = "Active";
           
            db.OrderBooks.Add(orderBook);
            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }

        [HttpPut]
        [Route("CancelOrder")]
        public IActionResult CancelOrder([FromBody] int orderID)
        {
            Refund refund = new Refund();
            var orderData = db.OrderBooks.Where(x => x.OrderId ==Convert.ToInt32(orderID)).FirstOrDefault();
            orderData.IsOrderActive = "Cancel";
            int? tempAmount = orderData.Amount;
            if (orderData.PaymentMethod=="card")
            {
                orderData.Amount = 0;

                refund.OrderId = orderData.OrderId;
                refund.RefundAmount = tempAmount;
                refund.UserId = orderData.UserId;
                db.Refunds.Add(refund);
                db.SaveChanges();
            }
            db.OrderBooks.Update(orderData);
            db.SaveChanges();

         

            var response = new { Status = "Success" };
            return Ok(response);
        }
    }
}
