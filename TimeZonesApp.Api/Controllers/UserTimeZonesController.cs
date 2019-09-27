using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Api.Auth.Helpers;
using TimeZonesApp.Domain.Models;
using TimeZonesApp.Domain.Services;
using TimeZonesApp.Infrastructure;

namespace TimeZonesApp.Api.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route(Routes.UserTimeZones.Base)]
    public class UserTimeZonesController : ControllerBase
    {
        private readonly ILogger<UserTimeZonesController> logger;

        private readonly IUserTimeZoneService userTimeZoneService;

        public UserTimeZonesController(ILogger<UserTimeZonesController> logger, 
            IUserTimeZoneService userTimeZoneService)
        {
            this.logger = logger;
            this.userTimeZoneService = userTimeZoneService;
        }

        [HttpGet]
        public Task<IEnumerable<UserTimeZoneGetResponse>> Get()
        {
            int userId = User.GetId();
            return this.userTimeZoneService.GetUserTimeZones(userId);
        }

        [HttpPost]
        public Task Create(UserTimeZoneCreateRequest createDto)
        {
            // TODO: set createDto.OwnerId
            return userTimeZoneService.CreateUserTimeZone(createDto);
        }
    }
}
