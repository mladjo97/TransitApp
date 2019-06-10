namespace WebApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data.Entity.Migrations;
    using System.IO;
    using System.Linq;
    using System.Web.Hosting;
    using WebApp.Models;
    using WebApp.Persistence;

    internal sealed class Configuration : DbMigrationsConfiguration<WebApp.Persistence.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebApp.Persistence.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            AddUserRoles(context);
            AddUserTypes(context);
            AddUsers(context);
            AddStations(context);
            AddBusLineTypes(context);
            AddTicketTypes(context);
            AddUserTypeDiscounts(context);
            AddPriceLists(context);
            AddPriceListItems(context);

        }

        private void AddUserRoles(ApplicationDbContext context)
        {
            // Roles
            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Admin" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "TicketInspector"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "TicketInspector" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "User"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "User" };

                manager.Create(role);
            }
        }

        private void AddUserTypes(ApplicationDbContext context)
        {
            // User Types
            if (!context.UserTypes.Any(b => b.Name == "Scholar"))
            {
                var ut = new UserType()
                {
                    Name = "Scholar"
                };

                context.UserTypes.Add(ut);
                context.SaveChanges();
            }

            if (!context.UserTypes.Any(b => b.Name == "Pensioner"))
            {
                var ut = new UserType()
                {
                    Name = "Pensioner"
                };

                context.UserTypes.Add(ut);
                context.SaveChanges();
            }

            if (!context.UserTypes.Any(b => b.Name == "Regular"))
            {
                var ut = new UserType()
                {
                    Name = "Regular"
                };

                context.UserTypes.Add(ut);
                context.SaveChanges();
            }
        }

        private void AddUsers(ApplicationDbContext context)
        {
            // Users
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            var regularUserType = context.UserTypes.FirstOrDefault(x => x.Name == "Regular");

            if (!context.Users.Any(u => u.UserName == "mladjo@demo.com"))
            {
                var user = new ApplicationUser()
                {
                    Id = "mladjo",
                    UserName = "mladjo@demo.com",
                    Email = "mladjo@demo.com",
                    PasswordHash = ApplicationUser.HashPassword("Demo123#"),
                    FirstName = "Mladen",
                    LastName = "Milosevic",
                    Gender = Gender.Male,
                    DateOfBirth = new DateTime(1997, 1, 31),
                    Address = "Bulevar Oslobodjenja",
                    UserTypeId = regularUserType.Id,
                    UserType = regularUserType,
                    VerifiedDocumentImage = false
                };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
            }

            if (!context.Users.Any(u => u.UserName == "ticket@demo.com"))
            {
                var user = new ApplicationUser()
                {
                    Id = "ticket",
                    UserName = "ticket@demo.com",
                    Email = "ticket@demo.com",
                    PasswordHash = ApplicationUser.HashPassword("Demo123#"),
                    FirstName = "Ticket",
                    LastName = "Inspector",
                    Gender = Gender.Male,
                    DateOfBirth = new DateTime(1995, 3, 16),
                    Address = "Bulevar Evrope",
                    UserTypeId = regularUserType.Id,
                    UserType = regularUserType,
                    VerifiedDocumentImage = false
                };

                userManager.Create(user);
                userManager.AddToRole(user.Id, "TicketInspector");
            }

            if (!context.Users.Any(u => u.UserName == "demo@demo.com"))
            {
                var user = new ApplicationUser()
                {
                    Id = "demo",
                    UserName = "demo@demo.com",
                    Email = "demo@demo.com",
                    PasswordHash = ApplicationUser.HashPassword("Demo123#"),
                    FirstName = "Demo",
                    LastName = "User",
                    Gender = Gender.Male,
                    DateOfBirth = new DateTime(1995, 3, 16),
                    Address = "Bulevar Cara Dusana",
                    UserTypeId = regularUserType.Id,
                    UserType = regularUserType,
                    VerifiedDocumentImage = false
                };

                userManager.Create(user);
                userManager.AddToRole(user.Id, "User");
            }
        }

        private void AddStations(ApplicationDbContext context)
        {
            List<Station> stations = new List<Station>();
            string stationsPath = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), ConfigurationManager.AppSettings["StationsDataPath"]));
            using (StreamReader r = new StreamReader(stationsPath))
            {
                string json = r.ReadToEnd();
                stations = JsonConvert.DeserializeObject<List<Station>>(json);
            }

            foreach (var station in stations)
            {
                if (!context.Stations.Any(x => x.Name.Equals(station.Name) &&
                                              x.Lat.Equals(station.Lat) &&
                                              x.Lon.Equals(station.Lon)))
                {
                    context.Stations.Add(station);
                    context.SaveChanges();
                }
            }
        }

        private void AddBusLineTypes(ApplicationDbContext context)
        {
            // BusLine types
            if (!context.BusLineTypes.Any(b => b.Name == "Urban"))
            {
                var blt = new BusLineType()
                {
                    Name = "Urban"
                };

                context.BusLineTypes.Add(blt);
                context.SaveChanges();
            }

            if (!context.BusLineTypes.Any(b => b.Name == "Suburban"))
            {
                var blt = new BusLineType()
                {
                    Name = "Suburban"
                };

                context.BusLineTypes.Add(blt);
                context.SaveChanges();
            }
        }

        private void AddTicketTypes(ApplicationDbContext context)
        {
            if (!context.TicketTypes.Any(b => b.Name == "SingleUse"))
            {
                var ticketType = new TicketType()
                {
                    Name = "SingleUse"
                };

                context.TicketTypes.Add(ticketType);
                context.SaveChanges();
            }

            if (!context.TicketTypes.Any(b => b.Name == "Daily"))
            {
                var ticketType = new TicketType()
                {
                    Name = "Daily"
                };

                context.TicketTypes.Add(ticketType);
                context.SaveChanges();
            }

            if (!context.TicketTypes.Any(b => b.Name == "Monthly"))
            {
                var ticketType = new TicketType()
                {
                    Name = "Monthly"
                };

                context.TicketTypes.Add(ticketType);
                context.SaveChanges();
            }

            if (!context.TicketTypes.Any(b => b.Name == "Annual"))
            {
                var ticketType = new TicketType()
                {
                    Name = "Annual"
                };

                context.TicketTypes.Add(ticketType);
                context.SaveChanges();
            }
        }

        private void AddUserTypeDiscounts(ApplicationDbContext context)
        {
            UserType userType = context.UserTypes.FirstOrDefault(x => x.Name == "Scholar");

            if (userType != null)
            {
                if (!context.Discounts.Any(b => b.UserTypeId == userType.Id))
                {
                    var discount = new UserTypeDiscount()
                    {
                        UserTypeId = userType.Id,
                        Discount = 0.20f
                    };

                    context.Discounts.Add(discount);
                    context.SaveChanges();
                }
            }

            userType = context.UserTypes.FirstOrDefault(x => x.Name == "Pensioner");

            if (userType != null)
            {
                if (!context.Discounts.Any(b => b.UserTypeId == userType.Id))
                {
                    var discount = new UserTypeDiscount()
                    {
                        UserTypeId = userType.Id,
                        Discount = 0.30f
                    };

                    context.Discounts.Add(discount);
                    context.SaveChanges();
                }
            }

        } 

        private void AddPriceLists(ApplicationDbContext context)
        {
            if (context.PriceLists.Count() <= 0)
            {
                var priceList = new PriceList()
                {
                    ValidFrom = DateTime.Now,
                    ValidUntil = DateTime.Now.AddDays(5)
                };

                context.PriceLists.Add(priceList);
                context.SaveChanges();
            }
        }

        private void AddPriceListItems(ApplicationDbContext context)
        {
            // SingleUse ticket w/ discount of 20% for scholars
            TicketType ticketType = context.TicketTypes.FirstOrDefault(x => x.Name == "SingleUse");
            UserType userType = context.UserTypes.FirstOrDefault(x => x.Name == "Scholar");
            UserTypeDiscount discount = context.Discounts.FirstOrDefault(x => x.UserTypeId == userType.Id);
            PriceList priceList = context.PriceLists.FirstOrDefault();

            if(context.PriceListItems.Count() <= 0)
            {
                var priceListItem = new PriceListItem()
                {
                    BasePrice = 70,
                    TicketTypeId = ticketType.Id,
                    DiscountId = discount.Id,
                    PriceListId = priceList.Id
                };

                context.PriceListItems.Add(priceListItem);
                context.SaveChanges();
            }

            // SingleUse ticket w/ discount of 30% for Pensioners
            userType = context.UserTypes.FirstOrDefault(x => x.Name == "Pensioner");
            discount = context.Discounts.FirstOrDefault(x => x.UserTypeId == userType.Id);
            priceList = context.PriceLists.FirstOrDefault();

            if (context.PriceListItems.Count() <= 2)
            {
                var priceListItem = new PriceListItem()
                {
                    BasePrice = 70,
                    TicketTypeId = ticketType.Id,
                    DiscountId = discount.Id,
                    PriceListId = priceList.Id
                };

                context.PriceListItems.Add(priceListItem);
                context.SaveChanges();
            }


        }

        

    }
}
