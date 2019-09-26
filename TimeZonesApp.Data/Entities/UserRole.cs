using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeZonesApp.Data.Entities
{
    public class UserRole : IdentityUserRole<int>
    {
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }
    }
}
