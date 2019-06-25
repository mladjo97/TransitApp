using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepository
{
    public class TransactionsRepository : Repository<PayPalTransaction, int>, ITransactionsRepository
    {
        protected ApplicationDbContext AppDBContext
        {
            get
            {
                return context as ApplicationDbContext;
            }
        }

        public TransactionsRepository(DbContext context): base(context)
        {

        }
    }
}