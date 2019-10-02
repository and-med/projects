using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeZonesApp.Domain.Contracts.Responses;
using TimeZonesApp.Domain.Services;
using TimeZonesApp.Infrastructure;

namespace TimeZonesApp.Auth.Services
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

        public async Task<IEnumerable<UserTimeZoneResponse>> GetUserTimeZones(int userId, int diffToGMT, string search)
        {
            var user = await userService.GetById(userId);
            var isAdmin = user.Data.Role == Roles.Admin;

            IEnumerable<UserTimeZoneResponse> timeZones;

            if (isAdmin)
            {
                timeZones = await userTimeZoneService.Get(diffToGMT, search);
            }
            else
            {
                timeZones = await userTimeZoneService.GetByUser(userId, diffToGMT, search);
            }

            return timeZones;
        }
    }
}
