using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace TimeZonesApp.Data.Entities
{
    public class Role : IdentityRole<int>
    {
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
