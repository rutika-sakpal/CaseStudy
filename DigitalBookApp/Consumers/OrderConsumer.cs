using DigitalBookApp.Models;
using MassTransit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalBookApp.Consumers
{
    public class OrderConsumer: IConsumer<Shared.Model.OrderBook>
    {
        DigitalBookDBContext db = new DigitalBookDBContext();
        public Task Consume(ConsumeContext<Shared.Model.OrderBook> context)
        {
            var data = context.Message;

            var books = db.TblAuthorBooks.Where(x => x.AuthorBookId == data.AuthorBookId).FirstOrDefault();
            books.Quantity = books.Quantity - 1;
            db.TblAuthorBooks.Update(books);

            db.SaveChanges();
            return Task.CompletedTask;
        }
    }
}
