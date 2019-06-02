using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepository
{
    public class TicketTypeRepository : Repository<TicketType, int>, ITicketTypeRepository
    {
        protected ApplicationDbContext AppDBContext
        {
            get
            {
                return context as ApplicationDbContext;
            }
        }

        public TicketTypeRepository(DbContext context) : base(context)
        {

        }
    }
}