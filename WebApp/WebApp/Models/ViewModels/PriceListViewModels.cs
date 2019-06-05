using System;
using System.Collections.Generic;

namespace WebApp.Models.ViewModels
{
    public class PriceListViewModel
    {
        public int Id { get; set; }
        public DateTime ValidFrom { get; set; }

        public DateTime ValidUntil { get; set; }

        public IList<PriceListItemViewModel> PriceListItems { get; set; }
    }

    public class PriceListItemViewModel
    {
        public int Id { get; set; }

        public int TicketTypeId { get; set; }

        public string TicketTypeName { get; set; }

        public int UserTypeId { get; set; }

        public string UserTypeName { get; set; }

        public decimal BasePrice { get; set; }

        public bool HasDiscount { get; set; }
        public float? Discount { get; set; }
    }

}