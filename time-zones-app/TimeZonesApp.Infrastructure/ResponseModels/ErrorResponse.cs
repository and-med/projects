using System.Collections.Generic;

namespace TimeZonesApp.Infrastructure.ResponseModels
{
    public class ErrorResponse
    {
        public IEnumerable<string> Errors { get; }

        public ErrorResponse(IEnumerable<string> errors)
        {
            this.Errors = errors;
        }
    }
}
