using System.Collections.Generic;
using System.Linq;

namespace TimeZonesApp.Infrastructure.ResponseModels
{
    public class Response : ErrorResponse
    {
        public bool Success { get; }

        public Response() : base(Enumerable.Empty<string>())
        {
            Success = true;
        }

        public Response(IEnumerable<string> errors) : base(errors)
        {
            Success = false;
        }
    }
}
