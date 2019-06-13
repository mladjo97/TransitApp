using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class BusLineTypesController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;


        public BusLineTypesController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        // ovo treba premestiti odavde - test
        [HttpGet]
        [AllowAnonymous]
        [Route("api/UserTypes")]
        public IEnumerable<UserType> GetUserTypes()
        {
            return this._unitOfWork.UserTypeRepository.GetAll();
        }


        // GET: api/BusLineTypes
        [AllowAnonymous]
        public IEnumerable<BusLineType> GetBusLineTypes()
        {
            return _unitOfWork.BusLineTypeRepository.GetAll();
        }

        // GET: api/BusLineTypes/5
        [ResponseType(typeof(BusLineType))]
        public IHttpActionResult GetBusLineType(int id)
        {
            BusLineType busLineType = _unitOfWork.BusLineTypeRepository.Get(id);
            if (busLineType == null)
            {
                return NotFound();
            }

            return Ok(busLineType);
        }

        // PUT: api/BusLineTypes/5
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBusLineType(int id, BusLineType busLineType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != busLineType.Id)
            {
                return BadRequest();
            }

            _unitOfWork.BusLineTypeRepository.Update(busLineType);

            try
            {
                _unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusLineTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return Conflict();
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/BusLineTypes
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(BusLineType))]
        public IHttpActionResult PostBusLineType(BusLineType busLineType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _unitOfWork.BusLineTypeRepository.Add(busLineType);
            _unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = busLineType.Id }, busLineType);
        }

        // DELETE: api/BusLineTypes/5
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(BusLineType))]
        public IHttpActionResult DeleteBusLineType(int id)
        {
            BusLineType busLineType = _unitOfWork.BusLineTypeRepository.Get(id);
            if (busLineType == null)
            {
                return NotFound();
            }

            _unitOfWork.BusLineTypeRepository.Remove(busLineType);
            _unitOfWork.Complete();

            return Ok(busLineType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BusLineTypeExists(int id)
        {
            return _unitOfWork.BusLineTypeRepository.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}