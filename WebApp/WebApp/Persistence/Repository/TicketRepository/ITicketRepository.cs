using System.Collections.Generic;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepository
{
    public interface ITicketRepository : IRepository<Ticket, int>
    {
        IEnumerable<Ticket> GetUserTickets(string id);
    }
}