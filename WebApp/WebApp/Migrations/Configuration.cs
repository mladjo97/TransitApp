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

            // Users
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

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
                    UserType = UserType.Regular,
                    DateOfBirth = new DateTime(1997, 1, 31),
                    Address = "Bulevar Oslobodjenja"
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
                    UserType = UserType.Regular,
                    DateOfBirth = new DateTime(1995, 3, 16),
                    Address = "Bulevar Evrope"
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
                    UserType = UserType.Regular,
                    DateOfBirth = new DateTime(1995, 3, 16),
                    Address = "Bulevar Cara Dusana"
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
