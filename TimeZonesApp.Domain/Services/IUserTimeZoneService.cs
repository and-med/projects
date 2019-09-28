using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Domain.Contracts.Requests.UserTimeZone;
using TimeZonesApp.Domain.Contracts.Responses;
using TimeZonesApp.Infrastructure.ResponseModels;

namespace TimeZonesApp.Domain.Services
{
    public interface IUserTimeZoneService
    {
        Task<IEnumerable<UserTimeZoneResponse>> Get();
        Task<IEnumerable<UserTimeZoneResponse>> GetByUser(int userId);
        Task<UserTimeZoneResponse> GetById(int id);
        Task Create(int userId, UserTimeZoneCreateRequest request);
        Task<Response> Update(int id, UserTimeZoneUpdateRequest request);
        Task<Response> Delete(int id);
    }
}
