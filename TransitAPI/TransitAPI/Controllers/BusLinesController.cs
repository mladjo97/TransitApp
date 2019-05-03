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
        public IQueryable<BusLine> GetBusLines()
        {
            return db.BusLines;
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

            // ako je uspesno pronasao
            BusLineType blt = db.BusLineTypes.Find(busLine.BusLineTypeId);
            if (blt != null)
                busLine.Type = blt;

            busLine.Timetable = new List<StartTime>();
            List<StartTime> timeTable = db.StartTimes.Where(x => x.BusLineId == busLine.Id).ToList(); 
            if(timeTable != null)
            {
                busLine.Timetable = timeTable;
            }

            return Ok(busLine);
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