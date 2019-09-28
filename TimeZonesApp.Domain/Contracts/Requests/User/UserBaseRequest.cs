using System.Collections.Generic;

namespace TimeZonesApp.Domain.Contracts.Requests.User
{
    public class UserBaseRequest
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public IEnumerable<string> Roles { get; set; }
    }
}
