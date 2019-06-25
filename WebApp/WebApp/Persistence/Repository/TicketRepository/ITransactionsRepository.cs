using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepository
{
    public interface ITransactionsRepository : IRepository<PayPalTransaction, int>
    {
    }
}
