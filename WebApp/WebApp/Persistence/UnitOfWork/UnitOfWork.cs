using System;
using System.Data.Entity;
using Unity;
using WebApp.Persistence.Repository.BusLineRepository;
using WebApp.Persistence.Repository.UserRepository;
using WebApp.Persistence.Repository.TicketRepository;

namespace WebApp.Persistence.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;

        [Dependency]
        public IBusLineRepository BusLineRepository { get; set; }

        [Dependency]
        public IStationRepository StationRepository { get; set; }

        [Dependency]
        public IBusLineStationsRepository BusLineStationsRepository { get; set; }

        [Dependency]
        public IBusLineTypeRepository BusLineTypeRepository { get; set; }

        [Dependency]
        public IStartTimeRepository StartTimeRepository { get; set; }

        [Dependency]
        public IUserTypeRepository UserTypeRepository { get; set; }

        [Dependency]
        public IUserRepository UserRepository { get; set; }

        [Dependency]
        public ITicketRepository TicketRepository { get; set; }

        [Dependency]
        public IPriceListRepository PriceListRepository { get; set; }

        [Dependency]
        public IPriceListItemRepository PriceListItemRepository { get; set; }

        [Dependency]
        public IUserTypeDiscountRepository UserTypeDiscountRepository { get; set; }

        [Dependency]
        public ITicketTypeRepository TicketTypeRepository { get; set; }

        [Dependency]
        public ITransactionsRepository TransactionsRepository { get; set; }

        public UnitOfWork(DbContext context)
        {
            _context = context;
        }

        public int Complete()
        {
            return _context.SaveChanges();
        }


        #region Dispose methods

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion

    }
}