using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.BusLineRepository
{
    public class BusLineTypeRepository : Repository<BusLineType, int>, IBusLineTypeRepository
    {
        protected ApplicationDbContext AppDBContext
        {
            get
            {
                return context as ApplicationDbContext;
            }
        }

        public BusLineTypeRepository(DbContext context) : base(context)
        {

        }

    }
}