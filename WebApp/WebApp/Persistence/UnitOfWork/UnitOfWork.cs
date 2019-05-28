using System;
using System.Data.Entity;
using WebApp.Models;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;
        private Repository<BusLine, int> _busLineRepository;
        private Repository<Station, int> _stationRepository;
        private Repository<BusLineStations, int> _busLineStationsRepository;
        private Repository<BusLineType, int> _busLineTypeRepository;
        private Repository<StartTime, int> _startTimeRepository;

        public Repository<BusLine, int> BusLineRepository
        {
            get
            {
                if(this._busLineRepository == null)
                {
                    this._busLineRepository = new Repository<BusLine, int>(this._context);
                }

                return _busLineRepository;
            }
        }

        public Repository<Station, int> StationRepository
        {
            get
            {
                if (this._stationRepository == null)
                {
                    this._stationRepository = new Repository<Station, int>(this._context);
                }

                return _stationRepository;
            }
        }

        public Repository<BusLineStations, int> BusLineStationsRepository
        {
            get
            {
                if (this._busLineStationsRepository == null)
                {
                    this._busLineStationsRepository = new Repository<BusLineStations, int>(this._context);
                }

                return _busLineStationsRepository;
            }
        }

        public Repository<BusLineType, int> BusLineTypeRepository
        {
            get
            {
                if (this._busLineTypeRepository == null)
                {
                    this._busLineTypeRepository = new Repository<BusLineType, int>(this._context);
                }

                return _busLineTypeRepository;
            }
        }

        public Repository<StartTime, int> StartTimeRepository
        {
            get
            {
                if (this._startTimeRepository == null)
                {
                    this._startTimeRepository = new Repository<StartTime, int>(this._context);
                }

                return _startTimeRepository;
            }
        }

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