using System;
using WebApp.Persistence.Repository.BusLineRepository;
using WebApp.Persistence.Repository.UserRepository;
using WebApp.Persistence.Repository.TicketRepository;

namespace WebApp.Persistence.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IBusLineRepository BusLineRepository { get; set; }

        IStationRepository StationRepository { get; set; }

        IBusLineStationsRepository BusLineStationsRepository { get; set; }

        IBusLineTypeRepository BusLineTypeRepository { get; set; }

        IStartTimeRepository StartTimeRepository { get; set; }

        IUserTypeRepository UserTypeRepository { get; set; }

        IUserRepository UserRepository { get; set; }

        ITicketRepository TicketRepository { get; set; }

        IPriceListRepository PriceListRepository { get; set; }

        IPriceListItemRepository PriceListItemRepository { get; set; }

        IUserTypeDiscountRepository UserTypeDiscountRepository { get; set; }

        ITicketTypeRepository TicketTypeRepository { get; set; }

        int Complete();
    }
}
