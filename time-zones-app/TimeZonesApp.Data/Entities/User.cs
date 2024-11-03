using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TimeZonesApp.Data.Entities
{
    public class User : IdentityUser<int>
    {
        [Required]
        [MaxLength(256)]
        public string FirstName { get; set; }
        
        [Required]
        [MaxLength(256)]
        public string LastName { get; set; }

        public virtual ICollection<UserTimeZone> UserTimeZones { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
