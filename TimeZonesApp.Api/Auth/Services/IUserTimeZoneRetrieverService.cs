using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Domain.Contracts.Responses;

namespace TimeZonesApp.Api.Auth.Services
{
    public interface IUserTimeZoneRetrieverService
    {
        Task<IEnumerable<UserTimeZoneResponse>> GetUserTimeZones(int userId, int diffToGMT, string search);
    }
}
