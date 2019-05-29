using System;
using System.Data.Entity;
using Unity;
using WebApp.Persistence.Repository;

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