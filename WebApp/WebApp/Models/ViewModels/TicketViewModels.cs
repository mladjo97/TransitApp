using System;

namespace WebApp.Models.ViewModels
{
    public class TicketPriceViewModel
    {
        public int ItemId { get; set; }
        public decimal BasePrice { get; set; }
        public bool HasDiscount { get; set; }
        public float? DiscountRate { get; set; }
        public float? DiscountPrice { get; set; }
    }

    public class TicketInfoViewModel
    {
        public int TicketId { get; set; }
        public bool IsValid { get; set; }
        public string UserLastName { get; set; }
        public string UserFirstName { get; set; }
        public string TicketType { get; set; }
        public DateTime TimeOfPurchase { get; set; }
    }
}