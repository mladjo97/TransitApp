﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class Station
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(256)]
        public string Name { get; set; }

        [Required]
        [StringLength(256)]
        public string Address { get; set; }

        [Required]
        public decimal Lon { get; set; }

        [Required]
        public decimal Lat { get; set; }

        [Timestamp]
        public byte[] RowVersion { get; set; }

        public virtual ICollection<BusLineStations> BusLineStations { get; set; }

        public Station()
        {
            this.BusLineStations = new HashSet<BusLineStations>();
        }
    }
}