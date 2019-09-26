using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace TimeZonesApp.Data.Entities
{
    public class User : IdentityUser<int>
    {
        public virtual ICollection<UserTimeZone> UserTimeZones { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
