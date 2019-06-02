using System.Data.Entity;
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
    }
}