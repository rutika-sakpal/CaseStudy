using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PaymentApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        DigitalBookDBContext db = new DigitalBookDBContext();
        private readonly IBus bus;
        public OrderController(IBus _bus)
        {
            bus = _bus;
        }
        [HttpPost]
        [Route("SaveBookOrder")]
        public async Task<IActionResult> CreateOrder([FromBody]OrderBook orderBook)
        {
            if (orderBook != null)
            {
                
                orderBook.AuthorBookId = Convert.ToInt32(orderBook.AuthorBookId);
                orderBook.UserId = Convert.ToInt32(orderBook.UserId);
                orderBook.CardHolderName = orderBook.CardHolderName;
                orderBook.CardNumber = orderBook.CardNumber;
                orderBook.Cvv = orderBook.Cvv;
                orderBook.Pincode = orderBook.Pincode;
                orderBook.Address = orderBook.Address;
                orderBook.PaymentMethod = orderBook.PaymentMethod;
                orderBook.Amount = Convert.ToInt32(orderBook.Amount);
                orderBook.IsOrderActive = "Active";

                db.OrderBooks.Add(orderBook);
                db.SaveChanges();
                Shared.Model.OrderBook orderMessage = new Shared.Model.OrderBook();
                orderMessage.AuthorBookId = orderBook.AuthorBookId;
                orderMessage.OrderId = orderBook.OrderId;

                Uri uri = new Uri("rabbitmq:localhost/orderQueue");
                var endpoint = await bus.GetSendEndpoint(uri);
                await endpoint.Send(orderMessage);
                return Ok(new { status = "Your order is placed." });
            }
            return BadRequest();
        }
    }
}
