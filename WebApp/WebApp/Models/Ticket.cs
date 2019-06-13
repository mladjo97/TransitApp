using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class Ticket
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime TimeOfPurchase { get; set; }

        [Required]
        public bool IsValid { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }

        //[Timestamp]
        //public byte[] RowVersion { get; set; }

        [Required]
        [ForeignKey("Item")]
        public int ItemId { get; set; }
        public virtual PriceListItem Item { get; set; }

        
    }
}