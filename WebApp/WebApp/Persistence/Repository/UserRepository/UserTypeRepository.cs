using System.Data.Entity;
using System.Linq;
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

        public int GetRegularUserTypeId()
        {
            UserType userType = AppDBContext.UserTypes.Where(x => x.Name == "Regular").FirstOrDefault();
            if(userType == null)
            {
                return -1;
            }

            return userType.Id;
        }
    }
}