using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using WebApp.Models;

namespace WebApp.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public virtual DbSet<BusLine> BusLines { get; set; }
        public virtual DbSet<Station> Stations { get; set; }
        public virtual DbSet<BusLineStations> BusLineStations { get; set; }
        public virtual DbSet<BusLineType> BusLineTypes { get; set; }
        public virtual DbSet<StartTime> StartTimes { get; set; }
        public virtual DbSet<UserType> UserTypes { get; set; }
        public virtual DbSet<Ticket> Tickets { get; set; }
        public virtual DbSet<TicketType> TicketTypes { get; set; }
        public virtual DbSet<UserTypeDiscount> Discounts { get; set; }
        public virtual DbSet<PriceList> PriceLists { get; set; }
        public virtual DbSet<PriceListItem> PriceListItems { get; set; }
        public virtual DbSet<PayPalTransaction> Transactions { get; set; }

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