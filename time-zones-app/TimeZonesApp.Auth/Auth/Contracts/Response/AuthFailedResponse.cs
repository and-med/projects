using System.Collections.Generic;
using TimeZonesApp.Infrastructure.ResponseModels;

namespace TimeZonesApp.Auth.Contracts.Response
{
    public class AuthFailedResponse : ErrorResponse
    {
        public AuthFailedResponse(IEnumerable<string> errors) : base(errors)
        {
        }
    }
}
