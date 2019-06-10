using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using WebApp.Models;

namespace WebApp.Persistence.Repository.BusLineRepository
{
    public class BusLineRepository : Repository<BusLine, int>, IBusLineRepository
    {

        protected ApplicationDbContext AppDBContext
        {
            get
            {
                return context as ApplicationDbContext;
            }
        }

        public BusLineRepository(DbContext context) : base(context)
        {

        }

        public IEnumerable<BusLine> GetAllBusLines()
        {
            return AppDBContext.BusLines.Include(x => x.BusLineStations.Select(y => y.Station))
                                        .Include(x => x.Timetable)
                                        .Include(x => x.Type)
                                        .ToList();
        }
    }
}