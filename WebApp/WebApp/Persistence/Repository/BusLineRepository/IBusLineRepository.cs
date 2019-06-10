using System.Collections.Generic;
using WebApp.Models;

namespace WebApp.Persistence.Repository.BusLineRepository
{
    public interface IBusLineRepository : IRepository<BusLine, int>
    { 
        IEnumerable<BusLine> GetAllBusLines();
    }
}