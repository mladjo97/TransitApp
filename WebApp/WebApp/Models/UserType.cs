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
        [Index(IsUnique = true)]
        public string Name { get; set; }

        public ICollection<ApplicationUser> Users { get; set; }

        public UserType()
        {
            this.Users = new HashSet<ApplicationUser>();
        }

    }
}