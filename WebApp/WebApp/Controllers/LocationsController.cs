using System.Web.Http;
using WebApp.Hubs;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Locations")]
    public class LocationsController : ApiController
    {
        private BusLineHub hub;

        public LocationsController(BusLineHub hub)
        {
            this.hub = hub;
        }

        [HttpPost]
        public IHttpActionResult Post(int id)
        {

            return Ok();
        }
    }
}
