using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models.BindingModels
{
    public class AddBusLineBindingModel
    {
        [Required]
        [StringLength(256)]
        public string Name { get; set; }

        [StringLength(1024)]
        public string Description { get; set; }

        [Required]
        public int BusLineTypeId { get; set; }

        public ICollection<StartTime> Timetable { get; set; }

        public ICollection<BusLineStations> BusLineStations { get; set; }
    }
}