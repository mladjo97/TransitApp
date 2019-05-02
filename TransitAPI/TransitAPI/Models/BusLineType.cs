using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TransitAPI.Models
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

        public List<BusLine> BusLines { get; set; }

    }
}