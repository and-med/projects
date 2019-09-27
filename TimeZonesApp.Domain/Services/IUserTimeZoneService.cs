using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Domain.Models;

namespace TimeZonesApp.Domain.Services
{
    public interface IUserTimeZoneService
    {
        Task CreateUserTimeZone(UserTimeZoneCreateRequest userTimeZoneCreateDto);
        Task<IEnumerable<UserTimeZoneGetResponse>> GetUserTimeZones(int userId);
    }
}
