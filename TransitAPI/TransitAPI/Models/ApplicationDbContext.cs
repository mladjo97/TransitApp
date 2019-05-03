using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace TransitAPI.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public virtual DbSet<BusLine> BusLines { get; set; }
        public virtual DbSet<Station> Stations { get; set; }
        public virtual DbSet<BusLineType> BusLineTypes { get; set; }
        public virtual DbSet<StartTime> StartTimes { get; set; }

        public ApplicationDbContext()
            : base("TransitAppDbConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }       
}