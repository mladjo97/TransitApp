using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using TransitAPI.Models;

namespace TransitAPI
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            AddBusLineTypes();
            AddBusLines();
        }

        private void AddBusLineTypes()
        {
            List<BusLineType> busLineTypes = new List<BusLineType>()
            {
                new BusLineType() { Name = "Urban" },
                new BusLineType() { Name = "Suburban" }
            };

            using (var db = new ApplicationDbContext())
            {
                foreach (var blType in busLineTypes)
                {
                    if(!db.BusLineTypes.Any(x => x.Name == blType.Name))
                        db.BusLineTypes.Add(blType);
                }

                db.SaveChanges();
            }
        }

        private void AddBusLines()
        {
            List<BusLine> busLines = new List<BusLine>()
            {
                new BusLine() { Name = "1", Description = "Gradski - 1 (Novi Sad)", BusLineTypeId = 1,
                                Timetable = new List<StartTime>() { new StartTime() { Time = DateTime.Now } } }

            };

            using (var db = new ApplicationDbContext())
            {
                foreach (var bl in busLines)
                {
                    if(!db.BusLines.Any(x => x.Name == bl.Name))
                        db.BusLines.Add(bl);
                }

                db.SaveChanges();
            }
        }


    }
}

