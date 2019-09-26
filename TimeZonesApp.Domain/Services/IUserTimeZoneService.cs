using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Domain.Models;

namespace TimeZonesApp.Domain.Services
{
    public interface IUserTimeZoneService
    {
        Task CreateUserTimeZone(UserTimeZoneCreateDto userTimeZoneCreateDto);
        Task<IEnumerable<UserTimeZoneDto>> GetUserTimeZones(int userId);
    }
}
