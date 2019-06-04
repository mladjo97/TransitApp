using System.Collections.Generic;
using System.Web.Http;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/UserTypes")]
    public class UserTypesController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserTypesController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        // GET: api/UserTypes
        [HttpGet]
        public IEnumerable<UserType> Get()
        {
            return _unitOfWork.UserTypeRepository.GetAll();
        }

        // GET: api/UserTypes/5
        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            UserType type = _unitOfWork.UserTypeRepository.Get(id);
            if (type == null)
                return BadRequest();

            return Ok(type);
        }

        // POST: api/UserTypes
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/UserTypes/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/UserTypes/5
        public void Delete(int id)
        {
        }
    }
}
