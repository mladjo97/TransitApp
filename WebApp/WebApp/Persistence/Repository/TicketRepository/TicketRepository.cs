using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepository
{
    public class TicketRepository : Repository<Ticket, int>, ITicketRepository
    {
        protected ApplicationDbContext AppDBContext
        {
            get
            {
                return context as ApplicationDbContext;
            }
        }

        public TicketRepository(DbContext context) : base(context)
        {

        }

        public IEnumerable<Ticket> GetUserTickets(string id)
        {
            return AppDBContext.Tickets.Where(x => x.UserId.Equals(id))
                                       .Include(x => x.Item)
                                       .ToList();
        }

    }
}