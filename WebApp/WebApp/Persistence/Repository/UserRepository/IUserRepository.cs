using WebApp.Models;

namespace WebApp.Persistence.Repository.UserRepository
{
    public interface IUserRepository : IRepository<ApplicationUser, int>
    {
        ApplicationUser GetUserById(string userId);
    }
}
