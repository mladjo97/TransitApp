using System.Collections.Generic;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepository
{
    public interface ITicketRepository : IRepository<Ticket, int>
    {
        Ticket GetTicket(int id);
        IEnumerable<Ticket> GetUserTickets(string id);
        bool IsValid(Ticket ticket);
    }
}