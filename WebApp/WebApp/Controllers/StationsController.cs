using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class StationsController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public StationsController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        // GET: api/Stations/Count
        [Route("api/Stations/Count")]
        [AllowAnonymous]
        public int GetStationsCount()
        {
            int count = _unitOfWork.StationRepository.GetAll().Count();
            return count;
        }

        // GET: api/Stations
        public IEnumerable<Station> GetStations()
        {
            return _unitOfWork.StationRepository.GetAll();
        }

        // GET: api/Stations/5
        [ResponseType(typeof(Station))]
        public IHttpActionResult GetStation(int id)
        {
            Station station = _unitOfWork.StationRepository.Get(id);
            if (station == null)
            {
                return NotFound();
            }

            return Ok(station);
        }

        // PUT: api/Stations/5
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStation(int id, Station station)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != station.Id)
            {
                return BadRequest();
            }

            if (!ValidateCoordinates(station.Lon, station.Lat))
            {
                return BadRequest("Coordinates are not valid");
            }

            _unitOfWork.StationRepository.Update(station);

            try
            {
                _unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Stations
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(Station))]
        public IHttpActionResult PostStation(Station station)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(!ValidateCoordinates(station.Lon, station.Lat))
            {
                return BadRequest("Coordinates are not valid");
            }

            _unitOfWork.StationRepository.Add(station);
            _unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = station.Id }, station);
        }

        // DELETE: api/Stations/5
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(Station))]
        public IHttpActionResult DeleteStation(int id)
        {
            Station station = _unitOfWork.StationRepository.Get(id);
            if (station == null)
            {
                return NotFound();
            }

            _unitOfWork.StationRepository.Remove(station);
            _unitOfWork.Complete();

            return Ok(station);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StationExists(int id)
        {
            return _unitOfWork.StationRepository.GetAll().Count(e => e.Id == id) > 0;
        }

        private bool ValidateCoordinates(decimal lon, decimal lat)
        {
            if (-180.0m > lon || lon > 180.0m)
                return false;
            if (-85.05112878m > lat || lat > 85.05112878m)
                return false;

            return true;
        }
    }
}