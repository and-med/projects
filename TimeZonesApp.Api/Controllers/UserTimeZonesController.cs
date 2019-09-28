using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Api.Auth.Helpers;
using TimeZonesApp.Domain.Contracts.Requests;
using TimeZonesApp.Domain.Contracts.Responses;
using TimeZonesApp.Domain.Services;
using TimeZonesApp.Infrastructure;

namespace TimeZonesApp.Api.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, 
        Roles = Roles.User + "," + Roles.Admin)]
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
        public Task<IEnumerable<UserTimeZoneResponse>> Get()
        {
            int userId = User.GetId();
            return this.userTimeZoneService.GetByUser(userId);
        }

        [HttpGet]
        [Route("{id:int}")]
        public Task<UserTimeZoneResponse> Get(int id)
        {
            int userId = User.GetId();
            return this.userTimeZoneService.GetById(id);
        }

        [HttpPost]
        public Task Create(UserTimeZoneCreateRequest request)
        {
            int userId = User.GetId();
            return userTimeZoneService.Create(userId, request);
        }

        [HttpPut]
        [Route("{id:int}")]
        public Task Update(int id, UserTimeZoneUpdateRequest request)
        {
            return userTimeZoneService.Update(id, request);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public Task Delete(int id)
        {
            return userTimeZoneService.Delete(id);
        }
    }
}
