using System.Collections.Generic;
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

        // GET: api/TicketTypes
        [HttpGet]
        public IEnumerable<TicketType> Get()
        {
            return _unitOfWork.TicketTypeRepository.GetAll();
        }

        [HttpGet]
        public IHttpActionResult Get([FromUri]int id)
        {
            TicketType type = _unitOfWork.TicketTypeRepository.Get(id);

            if (type == null)
            {
                return BadRequest();
            }

            return Ok(type.Id);
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

        // POST: api/TicketTypes
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/TicketTypes/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/TicketTypes/5
        public void Delete(int id)
        {
        }
    }
}
