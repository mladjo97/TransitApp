using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepository
{
    public interface ITicketTypeRepository : IRepository<TicketType, int>
    {
        TicketType GetTicketTypeByName(string name);
    }
}