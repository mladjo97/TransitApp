using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepository
{
    public class PriceListRepository : Repository<PriceList, int>, IPriceListRepository
    {
        protected ApplicationDbContext AppDBContext
        {
            get
            {
                return context as ApplicationDbContext;
            }
        }

        public PriceListRepository(DbContext context) : base(context)
        {

        }
    }
}