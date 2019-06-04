using System.ComponentModel.DataAnnotations;

namespace WebApp.Models.BindingModels
{
    public class BuyTicketBindingModel
    {
        [Required]
        public int ItemId { get; set; }
    }

    public class TicketPricesBindingModel
    {
        [Required]
        public int TicketTypeId { get; set; }
    }
}