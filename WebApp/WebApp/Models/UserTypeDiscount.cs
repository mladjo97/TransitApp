﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class UserTypeDiscount
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [ForeignKey("UserType")]
        public int UserTypeId { get; set; }
        public virtual UserType UserType { get; set; }

        [Required]
        public float Discount { get; set; }

        public virtual ICollection<PriceListItem> PriceListItems { get; set; }

        public UserTypeDiscount()
        {
            this.PriceListItems = new HashSet<PriceListItem>();
        }

    }
}