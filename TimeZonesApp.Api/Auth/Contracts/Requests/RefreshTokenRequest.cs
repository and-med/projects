using System;

namespace TimeZonesApp.Api.Auth.Contracts.Requests
{
    public class RefreshTokenRequest
    {
        public string Token { get; set; }

        public Guid RefreshToken { get; set; }
    }
}
