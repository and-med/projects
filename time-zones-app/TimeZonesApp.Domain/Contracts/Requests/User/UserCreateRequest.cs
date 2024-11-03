using System.Collections.Generic;

namespace TimeZonesApp.Domain.Contracts.Requests.User
{
    public class UserCreateRequest : UserBaseRequest
    {
        public string Password { get; set; }
    }
}
