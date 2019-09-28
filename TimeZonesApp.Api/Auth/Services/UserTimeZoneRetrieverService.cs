using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeZonesApp.Domain.Contracts.Responses;
using TimeZonesApp.Domain.Services;
using TimeZonesApp.Infrastructure;

namespace TimeZonesApp.Api.Auth.Services
{
    public class UserTimeZoneRetrieverService : IUserTimeZoneRetrieverService
    {
        private readonly IUserService userService;

        private readonly IUserTimeZoneService userTimeZoneService;

        public UserTimeZoneRetrieverService(IUserService userService, IUserTimeZoneService userTimeZoneService)
        {
            this.userService = userService;
            this.userTimeZoneService = userTimeZoneService;
        }

        public async Task<IEnumerable<UserTimeZoneResponse>> GetUserTimeZones(int userId)
        {
            var user = await userService.GetById(userId);
            var isAdmin = user.Data.Roles.Contains(Roles.Admin);

            IEnumerable<UserTimeZoneResponse> timeZones;

            if (isAdmin)
            {
                timeZones = await userTimeZoneService.Get();
            }
            else
            {
                timeZones = await userTimeZoneService.GetByUser(userId);
            }

            return timeZones;
        }
    }
}
