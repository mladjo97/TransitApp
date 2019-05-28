using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class StartTimeRepository : Repository<StartTime, int>, IStartTimeRepository
    {
        protected ApplicationDbContext AppDBContext
        {
            get
            {
                return context as ApplicationDbContext;
            }
        }

        public StartTimeRepository(DbContext context): base(context)
        {

        }
    }
}