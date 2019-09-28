using System.ComponentModel.DataAnnotations;

namespace TimeZonesApp.Api.Auth.Contracts.Requests
{
    public class UserRegistrationRequest
    {
        [EmailAddress]
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
