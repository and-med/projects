using System.Collections.Generic;

namespace TimeZonesApp.Infrastructure.ResponseModels
{
    public class DataResponse<T> : Response
    {
        public T Data { get; }

        public DataResponse(T data)
        {
            this.Data = data;
        }

        public DataResponse(IEnumerable<string> errors) : base(errors)
        {
            this.Data = default(T);
        }
    }
}
