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
}