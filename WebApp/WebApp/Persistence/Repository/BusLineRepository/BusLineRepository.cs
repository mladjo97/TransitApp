using System.Data.Entity;
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
    }
}