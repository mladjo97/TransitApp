using System.Collections.Generic;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepository
{
    public interface IPriceListRepository : IRepository<PriceList, int>
    {
        PriceList GetActivePriceList();
        IEnumerable<PriceListItem> GetActivePriceListItems();
        IEnumerable<PriceListItem> GetPriceListItems(int ticketTypeId);
    }
}