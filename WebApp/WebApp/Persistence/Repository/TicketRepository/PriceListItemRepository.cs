using System.Data.Entity;
using System.Linq;
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

        public decimal GetRegularPrice(int id)
        {
            PriceListItem item = this.AppDBContext.PriceListItems.FirstOrDefault(x => x.Id.Equals(id));

            if (item != null)
            {
                return item.BasePrice;
            }

            return -1.0m;
        }

        public float GetDiscountPrice(int id)
        {
            PriceListItem item = this.AppDBContext.PriceListItems.FirstOrDefault(x => x.Id.Equals(id));

            if (item != null)
            {
                return (float)item.BasePrice * (1 - item.Discount.Discount);
            }

            return -1.0f;
        }

        public PriceListItem GetSingleUse()
        {
            return AppDBContext.PriceListItems.Where(x => x.TicketType.Name == "SingleUse").FirstOrDefault();
        }
    }
}