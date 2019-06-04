using System.Data.Entity;
using System.Linq;
using WebApp.Models;

namespace WebApp.Persistence.Repository.UserRepository
{
    public class UserRepository : Repository<ApplicationUser, int>, IUserRepository
    {
        protected ApplicationDbContext AppDbContext { get { return context as ApplicationDbContext; } }

        public UserRepository(DbContext context) : base(context)
        {

        }

        public ApplicationUser GetUserById(string userId)
        {
            return AppDbContext.Users.Where(u => u.Id.Equals(userId))
                                     .Include(x => x.Tickets)
                                     .FirstOrDefault();
        }
    }
}