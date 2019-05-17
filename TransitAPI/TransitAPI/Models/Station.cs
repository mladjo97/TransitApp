using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TransitAPI.Models
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

        public virtual ICollection<BusLine> BusLines { get; set; }

        public Station()
        {
            this.BusLines = new HashSet<BusLine>();
        }

    }
}