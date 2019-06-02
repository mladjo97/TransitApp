using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class PriceList
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime ValidFrom { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime ValidUntil { get; set; }

        public virtual ICollection<PriceListItem> PriceListItems { get; set; }

        public PriceList()
        {
            this.PriceListItems = new HashSet<PriceListItem>();
        }

    }
}