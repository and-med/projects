using System.Collections.Generic;

namespace TimeZonesApp.Domain.Contracts.Responses.User
{
    public class UserResponse
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public IEnumerable<string> Roles { get; set; }
    }
}
