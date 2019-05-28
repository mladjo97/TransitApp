using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class BusLineType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(256)]
        [Index(IsUnique = true)]
        public string Name { get; set; }

        public ICollection<BusLine> BusLines { get; set; }

        public BusLineType()
        {
            this.BusLines = new HashSet<BusLine>();
        }
    }
}