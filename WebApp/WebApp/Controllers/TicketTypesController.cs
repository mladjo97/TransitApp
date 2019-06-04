using System.Web.Http;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/TicketTypes")]
    public class TicketTypesController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        

        public TicketTypesController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IHttpActionResult Get([FromUri]string name)
        {
            TicketType type = _unitOfWork.TicketTypeRepository.GetTicketTypeByName(name);

            if(type == null)
            {
                return BadRequest();
            }

            return Ok(type.Id);
        }
    }
}
