using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepository
{
    public class UserTypeDiscountRepository : Repository<UserTypeDiscount, int>, IUserTypeDiscountRepository
    {
        protected ApplicationDbContext AppDBContext
        {
            get
            {
                return context as ApplicationDbContext;
            }
        }

        public UserTypeDiscountRepository(DbContext context) : base(context)
        {

        }
    }
}