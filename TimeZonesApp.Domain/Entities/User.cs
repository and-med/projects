using System.Collections.Generic;

namespace TimeZonesApp.Domain.Entities
{
    public class User
    {
        public int Id { get; }

        public string Email { get; }

        public IEnumerable<Role> Roles { get; }

        public User(int id, string email, IEnumerable<Role> roles)
        {
            this.Id = id;
            this.Email = email;
            this.Roles = roles;
        }
    }
}
