using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models.BindingModels
{
    public class AddPriceListBindingModel
    {
        [Required]
        public DateTime ValidFrom { get; set; }

        [Required]
        public DateTime ValidUntil { get; set; }

        [Required]
        public IList<AddPriceListItemsBindingModel> PriceListItems { get; set; } 

        [Required]
        public byte[] RowVersion { get; set; }
    }

    public class AddPriceListItemsBindingModel
    {
        [Required]
        public int TicketTypeId { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        [Required]
        public decimal BasePrice { get; set; }

        [Required]
        public float Discount { get; set; }
    }

    public class EditPriceListBindingModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public DateTime ValidFrom { get; set; }

        [Required]
        public DateTime ValidUntil { get; set; }

        [Required]
        public IList<EditPriceListItemBindingModel> PriceListItems { get; set; }
    }

    public class EditPriceListItemBindingModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int TicketTypeId { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        [Required]
        public decimal BasePrice { get; set; }

        [Required]
        public int DiscountId { get; set; }

        [Required]
        public float Discount { get; set; }
    }

}