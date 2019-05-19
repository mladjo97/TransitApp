using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TransitAPI.Models;

namespace TransitAPI.Controllers
{
    public class BusLinesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/BusLines
        [AllowAnonymous]
        public IEnumerable<BusLine> GetBusLines()
        {
            return db.BusLines.ToList();
        }

        // GET: api/BusLines/5
        [AllowAnonymous]
        [ResponseType(typeof(BusLine))]
        public IHttpActionResult GetBusLine(int id)
        {
            BusLine busLine = db.BusLines.Find(id);
            if (busLine == null)
            {
                return NotFound();
            }

            // ako je uspesno pronasao, dodati info o tipu ...
            BusLineType blt = db.BusLineTypes.Find(busLine.BusLineTypeId);
            if (blt != null)
                busLine.Type = blt;

            // ... timetable ...
            busLine.Timetable = new List<StartTime>();
            List<StartTime> timeTable = db.StartTimes.Where(x => x.BusLineId == busLine.Id).ToList(); 
            if(timeTable != null)
            {
                busLine.Timetable = timeTable;
            }

            // ... i stations
            busLine.BusLineStations = new List<BusLineStations>();
            List<BusLineStations> stations = db.BusLineStations.Where(x => x.BusLineId == busLine.Id).ToList();
            
            if (stations != null)
            {
                foreach (var s in stations)
                {
                    s.Station = db.Stations.FirstOrDefault(x => x.Id == s.StationId);
                }

                busLine.BusLineStations = stations.OrderBy(x => x.StopOrder).ToList();
            }

            return Ok(busLine);
        }

        // GET: api/BusLines?busLineTypeId=4
        [AllowAnonymous]
        public IQueryable<BusLine> GetBusLines(int busLineTypeId)
        {
            return db.BusLines.Where(x => x.BusLineTypeId == busLineTypeId);
        }


        // POST: api/BusLines
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(BusLine))]
        public IHttpActionResult PostBusLine(BusLine busLine)
        {
            // get referenced buslinetype
            BusLineType blt = db.BusLineTypes.FirstOrDefault(x => x.Id == busLine.BusLineTypeId);
            if (blt != null)
                busLine.Type = blt;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BusLines.Add(busLine);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = busLine.Id }, busLine);
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

            // clear all times for busline
            List<StartTime> blTimes = db.StartTimes.Where(x => x.BusLineId.Equals(busLine.Id)).ToList();
            foreach (var time in blTimes)
                db.Entry(time).State = EntityState.Deleted;

            // update IDs
            foreach (var time in busLine.Timetable)
            {
                time.BusLineId = busLine.Id;
                db.Entry(time).State = EntityState.Added;
            }
            

            db.Entry(busLine).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
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


        // DELETE: api/BusLines/5
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(BusLine))]
        public IHttpActionResult DeleteBusLine(int id)
        {
            BusLine busLine = db.BusLines.Find(id);
            if (busLine == null)
            {
                return NotFound();
            }

            db.BusLines.Remove(busLine);
            db.SaveChanges();

            return Ok(busLine);
        }


        // GET: api/BusLineTypes
        [HttpGet]
        [AllowAnonymous]
        [Route("api/BusLineTypes")]
        public IQueryable<BusLineType> GetBusLineTypes()
        {
            return db.BusLineTypes;
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BusLineExists(int id)
        {
            return db.BusLines.Count(e => e.Id == id) > 0;
        }
    }
}