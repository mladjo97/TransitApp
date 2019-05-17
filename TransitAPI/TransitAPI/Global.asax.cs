using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using TransitAPI.Models;
using static TransitAPI.Models.Enums;

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

            // Seed metoda nije radila - moram ovako za sad
            AddAdminsAndRoles();
            AddStations();
            AddBusLineTypes();
            AddBusLines();

        }

        private void AddAdminsAndRoles()
        {
            // Initialize default identity roles
            using (var context = new ApplicationDbContext())
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);

                List<IdentityRole> identityRoles = new List<IdentityRole>();
                identityRoles.Add(new IdentityRole() { Name = "Admin" });
                identityRoles.Add(new IdentityRole() { Name = "TicketInspector" });
                identityRoles.Add(new IdentityRole() { Name = "User" });

                foreach (IdentityRole role in identityRoles)
                {
                    manager.Create(role);
                }

                // Initialize admin
                var userStore = new UserStore<ApplicationUser>(context);
                var userManager = new UserManager<ApplicationUser>(userStore);
                ApplicationUser admin = new ApplicationUser()
                {
                    FirstName = "Mladen",
                    LastName = "Milosevic",
                    Email = "mladjo@demo.com",
                    UserName = "mladjo@demo.com",
                    Role = "Admin",
                    Gender = Gender.Male
                };

                IdentityResult result = userManager.Create(admin, "Demo123");

                if (result.Succeeded)
                {
                    ApplicationUser currentUser = userManager.FindByName(admin.UserName);

                    IdentityResult roleResult = userManager.AddToRole(currentUser.Id, currentUser.Role);
                }
            }

        }

        private void AddStations()
        {
            List<Station> initialStations = new List<Station>();

            using (StreamReader r = new StreamReader(@"C:\Users\Mladjo\Desktop\TransitApp\TransitApp\src\assets\data\stations.json"))
            {
                string json = r.ReadToEnd();

                initialStations = JsonConvert.DeserializeObject<List<Station>>(json);
            }

            using (var db = new ApplicationDbContext())
            {
                foreach (var station in initialStations)
                {
                    var result = db.Stations.FirstOrDefault(x => x.Lat == station.Lat &&
                                                                 x.Lon == station.Lon &&
                                                                 x.Name == station.Name &&
                                                                 x.Address == station.Address);
                    if (result == null)
                        db.Stations.Add(station);
                }

                try
                {
                    db.SaveChanges();
                }
                catch (Exception) { }
            }
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
                    var result = db.BusLineTypes.FirstOrDefault(x => x.Name == blType.Name);
                    if (result == null)
                        db.BusLineTypes.Add(blType);
                }

                try
                {
                    db.SaveChanges();
                }
                catch (Exception) {}
            }
        }

        private void AddBusLines()
        {

            BusLineType blType = new BusLineType();
            using (var db = new ApplicationDbContext())
            {
                blType = db.BusLineTypes.FirstOrDefault(x => x.Name == "Urban");
            }
            
            

            List<BusLine> busLines = new List<BusLine>()
            {
                new BusLine() { Name = "7A", Description = "Zeleznicka - Futoska - Liman - N.Naselje", BusLineTypeId = blType.Id,
                                Timetable = new HashSet<StartTime>() { new StartTime() { Time = DateTime.Now } }
                               }
            };

            using (var db = new ApplicationDbContext())
            {
                foreach (var bl in busLines)
                {
                    List<Station> stations = db.Stations.Where(x => x.Name == "Zeleznicka" ||
                                                          x.Name == "Simpo" ||
                                                          x.Name == "Aleksandar Zgrada").ToList();

                    var result = db.BusLines.FirstOrDefault(x => x.Name == bl.Name);
                    if (result == null)
                    {
                        foreach (var s in stations)
                            bl.Stations.Add(s);

                        db.BusLines.Add(bl);
                    }
                }

                try
                {
                    db.SaveChanges();
                }
                catch (Exception e) {}
               
            }
        }



    }
}

