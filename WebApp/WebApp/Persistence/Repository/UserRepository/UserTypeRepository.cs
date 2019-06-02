using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.UserRepository
{
    public class UserTypeRepository : Repository<UserType, int>, IUserTypeRepository
    {

        protected ApplicationDbContext AppDBContext
        {
            get
            {
                return context as ApplicationDbContext;
            }
        }

        public UserTypeRepository(DbContext context) : base(context)
        {

        }
    }
}