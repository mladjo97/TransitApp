using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class UserType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(256)]
        public string Name { get; set; }

        public ICollection<ApplicationUser> Users { get; set; }
        public ICollection<UserTypeDiscount> Discounts { get; set; }

        public UserType()
        {
            this.Users = new HashSet<ApplicationUser>();
            this.Discounts = new HashSet<UserTypeDiscount>();
        }

    }
}