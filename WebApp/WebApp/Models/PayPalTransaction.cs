using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
    public class PayPalTransaction
    {
        [Key]
        public string OrderId { get; set; }

        public string UserId { get; set; }

        public string CreateTime { get; set; }

        public string Status { get; set; }

        public string PayerEmail { get; set; }

    }
}