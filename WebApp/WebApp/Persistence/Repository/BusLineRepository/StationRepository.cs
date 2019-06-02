using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.BusLineRepository
{
    public class StationRepository : Repository<Station, int>, IStationRepository
    {
        protected ApplicationDbContext AppDBContext
        {
            get
            {
                return context as ApplicationDbContext;
            }
        }

        public StationRepository(DbContext context) : base(context)
        {

        }
    }
}