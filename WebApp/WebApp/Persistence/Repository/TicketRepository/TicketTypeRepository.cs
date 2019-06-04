using System.Data.Entity;
using System.Linq;
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

        public TicketType GetTicketTypeByName(string name)
        {
            var ticketType = AppDBContext.TicketTypes.Where(x => x.Name.Equals(name)).FirstOrDefault();

            if(ticketType == null)
            {
                return null;
            }

            return ticketType;
        }
    }
}