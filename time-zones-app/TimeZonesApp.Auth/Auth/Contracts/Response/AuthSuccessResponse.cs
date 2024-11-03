using System;

namespace TimeZonesApp.Auth.Contracts.Response
{
    public class AuthSuccessResponse
    {
        public string Token { get; set; }
        
        public Guid RefreshToken { get; set; }
    }
}
