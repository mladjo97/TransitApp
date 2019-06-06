using System.Collections.Generic;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepository
{
    public interface IPriceListRepository : IRepository<PriceList, int>
    {
        PriceList GetActivePriceList();
        PriceList GetPriceListById(int id);
        IEnumerable<PriceList> GetAllPriceLists();
        IEnumerable<UserTypeDiscount> GetDiscounts(int id);
        IEnumerable<PriceListItem> GetActivePriceListItems();
        IEnumerable<PriceListItem> GetPriceListItems(int ticketTypeId);
    }
}