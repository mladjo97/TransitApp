using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TransitAPI.Models
{
    public class StartTime
    {
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [DataType(DataType.Date)]
        public DateTime Time { get; set; }

        [Key]
        [Column(Order = 2)]
        public int BusLineId { get; set; }

        [ForeignKey("BusLineId")]
        public BusLine BusLine { get; set; }
        
    }
}