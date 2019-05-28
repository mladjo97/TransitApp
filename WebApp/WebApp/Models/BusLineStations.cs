using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class BusLineStations
    {
        [Key, Column(Order = 0)]
        public int BusLineId { get; set; }

        [Key, Column(Order = 1)]
        public int StationId { get; set; }

        public virtual BusLine BusLine { get; set; }

        public virtual Station Station { get; set; }

        public int StopOrder { get; set; }
    }
}