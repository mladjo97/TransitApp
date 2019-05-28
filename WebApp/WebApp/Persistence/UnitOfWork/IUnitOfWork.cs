using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IBusLineRepository BusLineRepository { get; set; }

        IStationRepository StationRepository { get; set; }

        IBusLineStationsRepository BusLineStationsRepository { get; set; }

        IBusLineTypeRepository BusLineTypeRepository { get; set; }

        IStartTimeRepository StartTimeRepository { get; set; }

        int Complete();
    }
}
