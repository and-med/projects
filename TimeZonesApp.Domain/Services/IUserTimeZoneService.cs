using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Domain.Contracts.Requests.UserTimeZone;
using TimeZonesApp.Domain.Contracts.Responses;
using TimeZonesApp.Infrastructure.ResponseModels;

namespace TimeZonesApp.Domain.Services
{
    public interface IUserTimeZoneService
    {
        Task<IEnumerable<UserTimeZoneResponse>> Get(int diffToGmt);
        Task<IEnumerable<UserTimeZoneResponse>> GetByUser(int userId, int diffToGmt);
        Task<UserTimeZoneResponse> GetById(int id, int diffToGmt = 0);
        Task Create(int userId, UserTimeZoneCreateRequest request);
        Task<Response> Update(int id, UserTimeZoneUpdateRequest request);
        Task<Response> Delete(int id);
    }
}
