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
    public class BusLinesController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public BusLinesController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        // GET: api/BusLines/Count
        [Route("api/BusLines/Count")]
        [AllowAnonymous]
        public int GetBusLinesCount()
        {
            int count = _unitOfWork.BusLineTypeRepository.GetAll().Count();
            return count;
        }

        // GET: api/BusLines
        [AllowAnonymous]
        public IEnumerable<BusLine> GetBusLines()
        {
            return _unitOfWork.BusLineRepository.GetAllBusLines();
        }

        // GET: api/BusLines/5
        [AllowAnonymous]
        [ResponseType(typeof(BusLine))]
        public IHttpActionResult GetBusLine(int id)
        {
            BusLine busLine = _unitOfWork.BusLineRepository.Get(id);
            if (busLine == null)
            {
                return NotFound();
            }

            // ako je uspesno pronasao, dodati info o tipu ...
            BusLineType blt = _unitOfWork.BusLineTypeRepository.Get(busLine.BusLineTypeId);
            if (blt != null)
                busLine.Type = blt;

            // ... timetable ...
            busLine.Timetable = new List<StartTime>();
            List<StartTime> timeTable = _unitOfWork.StartTimeRepository.Find(x => x.BusLineId == busLine.Id).ToList();
            if (timeTable != null)
            {
                busLine.Timetable = timeTable;
            }

            // ... i stations
            busLine.BusLineStations = new List<BusLineStations>();
            List<BusLineStations> stations = _unitOfWork.BusLineStationsRepository.Find(x => x.BusLineId == busLine.Id).ToList();

            if (stations != null)
            {
                foreach (var s in stations)
                {
                    s.Station = _unitOfWork.StationRepository.Get(s.StationId);
                }

                busLine.BusLineStations = stations.OrderBy(x => x.StopOrder).ToList();
            }

            return Ok(busLine);
        }

        // GET: api/BusLines?busLineTypeId=4
        [AllowAnonymous]
        public IEnumerable<BusLine> GetBusLines(int busLineTypeId)
        {
            return _unitOfWork.BusLineRepository.Find(x => x.BusLineTypeId == busLineTypeId);
        }

        // PUT: api/BusLines/5
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBusLine(int id, BusLine busLine)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != busLine.Id)
            {
                return BadRequest();
            }

            // find from context to change
            var contextBusLine = _unitOfWork.BusLineRepository.Get(busLine.Id);
            if (contextBusLine == null)
                return BadRequest();

            // apply changes
            contextBusLine.Name = busLine.Name;
            contextBusLine.Description = contextBusLine.Description;

            var type = _unitOfWork.BusLineTypeRepository.Get(busLine.BusLineTypeId);
            if (type == null)
                return BadRequest();
            contextBusLine.BusLineTypeId = busLine.BusLineTypeId;
            contextBusLine.Type = type;

            // clear all times for busline
            List<StartTime> blTimes = _unitOfWork.StartTimeRepository.Find(x => x.BusLineId.Equals(busLine.Id)).ToList();
            foreach (var time in blTimes)
                _unitOfWork.StartTimeRepository.Remove(time);

            // update IDs
            foreach (var time in busLine.Timetable)
            {
                time.BusLineId = busLine.Id;
                _unitOfWork.StartTimeRepository.Add(time);
            }

            // apply changes
            contextBusLine.Timetable = busLine.Timetable;

            // clear stations
            List<BusLineStations> busLineStations = _unitOfWork.BusLineStationsRepository.Find(x => x.BusLineId == busLine.Id).ToList();
            foreach (var bls in busLineStations)
            {
                _unitOfWork.BusLineStationsRepository.Remove(bls);
            }

            // update stations
            foreach (var bls in busLine.BusLineStations)
            {
                BusLine bl = _unitOfWork.BusLineRepository.Get(busLine.Id);
                if (bl != null)
                {
                    bls.BusLineId = bl.Id;
                    bls.BusLine = bl;
                }

                Station s = _unitOfWork.StationRepository.Get(bls.StationId);
                if (s != null)
                {
                    bls.StationId = s.Id;
                    bls.Station = s;
                }

                _unitOfWork.BusLineStationsRepository.Add(bls);
            }

            // apply changes
            contextBusLine.BusLineStations = busLine.BusLineStations;
            
            _unitOfWork.BusLineRepository.Update(contextBusLine);

            try
            {
                _unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusLineExists(id))
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

        // POST: api/BusLines
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(BusLine))]
        public IHttpActionResult PostBusLine(BusLine busLine)
        {
            // get referenced buslinetype
            BusLineType blt = _unitOfWork.BusLineTypeRepository.Get(busLine.BusLineTypeId);
            if (blt != null)
                busLine.Type = blt;

            // get referenced stations
            foreach (var s in busLine.BusLineStations)
            {
                Station station = _unitOfWork.StationRepository.Get(s.StationId);
                if (station != null)
                    s.Station = station;

                s.BusLineId = busLine.Id;
                s.BusLine = busLine;
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _unitOfWork.BusLineRepository.Add(busLine);
            _unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = busLine.Id }, busLine);
        }

        // DELETE: api/BusLines/5
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(BusLine))]
        public IHttpActionResult DeleteBusLine(int id)
        {
            BusLine busLine = _unitOfWork.BusLineRepository.Get(id);
            if (busLine == null)
            {
                return NotFound();
            }

            _unitOfWork.BusLineRepository.Remove(busLine);
            _unitOfWork.Complete();

            return Ok(busLine);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BusLineExists(int id)
        {
            return _unitOfWork.BusLineRepository.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}