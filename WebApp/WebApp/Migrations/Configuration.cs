namespace WebApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using WebApp.Models;

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

            if (!context.UserTypes.Any(b => b.Name == "Senior Citizen"))
            {
                var ut = new UserType()
                {
                    Name = "Senior Citizen"
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

            // BusLine types
            if(!context.BusLineTypes.Any(b => b.Name == "Urban"))
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
    }
}
