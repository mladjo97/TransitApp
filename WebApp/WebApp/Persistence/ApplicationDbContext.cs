using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<BusLine> BusLines { get; set; }
        public DbSet<Station> Stations { get; set; }
        public DbSet<BusLineStations> BusLineStations { get; set; }
        public DbSet<BusLineType> BusLineTypes { get; set; }
        public DbSet<StartTime> StartTimes { get; set; }

        public ApplicationDbContext()
            : base("name=TransitAppDbConnection", throwIfV1Schema: false)
        {
            this.Configuration.ProxyCreationEnabled = false;
            this.Configuration.LazyLoadingEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Station>().Property(p => p.Lat).HasPrecision(20, 18);
            modelBuilder.Entity<Station>().Property(p => p.Lon).HasPrecision(20, 18);
            base.OnModelCreating(modelBuilder);
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}