using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Domain.Contracts.Requests;
using TimeZonesApp.Domain.Contracts.Responses;

namespace TimeZonesApp.Domain.Services
{
    public interface IUserTimeZoneService
    {
        Task<IEnumerable<UserTimeZoneResponse>> Get();
        Task<IEnumerable<UserTimeZoneResponse>> GetByUser(int userId);
        Task<UserTimeZoneResponse> GetById(int id);
        Task Create(int userId, UserTimeZoneCreateRequest request);
        Task Update(int id, UserTimeZoneUpdateRequest request);
        Task Delete(int id);
    }
}
