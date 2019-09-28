using System.Collections.Generic;
using System.Linq;

namespace TimeZonesApp.Infrastructure.ResponseModels
{
    public class Response<T> : ErrorResponse
    {
        public T Data { get; set; }
        public bool Success { get; set; }

        public Response(T data) : base(Enumerable.Empty<string>())
        {
            this.Data = data;
            this.Success = true;
        }

        public Response(IEnumerable<string> errors) : base(errors)
        {
            this.Data = default(T);
            this.Success = false;
        }
    }
}
