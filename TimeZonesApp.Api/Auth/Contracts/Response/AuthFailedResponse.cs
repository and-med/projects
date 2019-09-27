using System.Collections.Generic;

namespace TimeZonesApp.Api.Auth.Contracts.Response
{
    public class AuthFailedResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}
