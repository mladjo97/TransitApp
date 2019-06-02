using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepository
{
    public class PriceListItemRepository : Repository<PriceListItem, int>, IPriceListItemRepository
    {
        protected ApplicationDbContext AppDBContext
        {
            get
            {
                return context as ApplicationDbContext;
            }
        }

        public PriceListItemRepository(DbContext context) : base(context)
        {

        }
    }
}