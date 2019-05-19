﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static TransitAPI.Models.Enums;

namespace TransitAPI.Models
{

    public class BusLine
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(256)]
        public string Name { get; set; }

        [StringLength(1024)]
        public string Description { get; set; }

        [ForeignKey("Type")]
        public int BusLineTypeId { get; set; }
        public BusLineType Type { get; set; }        

        public virtual ICollection<StartTime> Timetable { get; set; }
        public virtual ICollection<BusLineStations> BusLineStations { get; set; }

        public BusLine()
        {
            this.Timetable = new HashSet<StartTime>();
            this.BusLineStations = new HashSet<BusLineStations>();
        }

    }
}