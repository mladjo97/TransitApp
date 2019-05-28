using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class BusLineStationsRepository : Repository<BusLineStations, int>, IBusLineStationsRepository
    {
        protected ApplicationDbContext AppDBContext
        {
            get
            {
                return context as ApplicationDbContext;
            }
        }

        public BusLineStationsRepository(DbContext context): base(context)
        {

        }
    }
}