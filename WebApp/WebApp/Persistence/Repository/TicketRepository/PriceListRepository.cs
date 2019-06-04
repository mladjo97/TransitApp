using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
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

        public PriceList GetActivePriceList()
        {
            var currentTime = DateTime.Now;
            return AppDBContext.PriceLists.Where(x => x.ValidFrom < currentTime && x.ValidUntil > currentTime)
                                           .Include(x => x.PriceListItems.Select(y => y.Discount.UserType))
                                           .Include(x => x.PriceListItems.Select(y => y.TicketType)).FirstOrDefault();
        }

        public IEnumerable<PriceListItem> GetActivePriceListItems()
        {
            var activePriceList = GetActivePriceList();
            return AppDBContext.PriceListItems.Where(x => x.PriceListId.Equals(activePriceList.Id))
                                              .Include(x => x.Discount.UserType)
                                              .Include(x => x.TicketType);
        }

        public IEnumerable<PriceListItem> GetPriceListItems(int ticketTypeId)
        {
            var activePriceList = GetActivePriceList();
            return AppDBContext.PriceListItems.Where(x => x.TicketTypeId.Equals(ticketTypeId) 
                                                       && x.PriceListId.Equals(activePriceList.Id))
                                              .Include(x => x.Discount)
                                              .Include(x => x.TicketType);
        }

        


    }
}