using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class PriceListItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public decimal BasePrice { get; set; }
        
        [Required]
        [ForeignKey("TicketType")]
        public int TicketTypeId { get; set; }
        public virtual TicketType TicketType { get; set; }

        [Required]
        [ForeignKey("PriceList")]
        public int PriceListId { get; set; }
        public virtual PriceList PriceList { get; set; }

        [ForeignKey("Discount")]
        public int DiscountId { get; set; }
        public virtual UserTypeDiscount Discount { get; set; }


    }
}