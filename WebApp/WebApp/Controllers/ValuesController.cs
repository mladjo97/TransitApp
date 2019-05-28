using System.Collections.Generic;
using System.Web.Http;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [Authorize]
    public class ValuesController : ApiController
    {
        private UnitOfWork _unitOfWork;

        public ValuesController()
        {
            this._unitOfWork = new UnitOfWork(new ApplicationDbContext());
        }

        // GET api/values
        public IEnumerable<BusLineType> Get()
        {
            return this._unitOfWork.BusLineTypeRepository.GetAll();
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
