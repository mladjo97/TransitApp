﻿using System.ComponentModel.DataAnnotations;

namespace WebApp.Models.BindingModels
{
    public class BuyTicketBindingModel
    {
        [Required]
        public int ItemId { get; set; }

        [Required]
        public string OrderId { get; set; }
    }

    public class TicketPricesBindingModel
    {
        [Required]
        public int TicketTypeId { get; set; }
    }

    public class BuyUnregisteredBindingModel
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        public string OrderId { get; set; }
    }
}