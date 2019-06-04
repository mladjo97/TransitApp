using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepository
{
    public interface IPriceListItemRepository : IRepository<PriceListItem, int>
    {
        decimal GetRegularPrice(int ticketTypeId);
        float GetDiscountPrice(int id);
    }
}
