using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TimeZonesApp.Auth.Authorization.Requirements;
using TimeZonesApp.Auth.Helpers;
using TimeZonesApp.Auth.Services;
using TimeZonesApp.Domain.Contracts.Requests.UserTimeZone;
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

        private readonly IAuthorizationService authorizationService;

        private readonly IAdminOrOwnerRequirement adminOrOwnerRequirement;

        private readonly IUserTimeZoneRetrieverService userTimeZoneRetrieverService;

        public UserTimeZonesController(ILogger<UserTimeZonesController> logger, 
            IUserTimeZoneService userTimeZoneService, 
            IAuthorizationService authorizationService,
            IAdminOrOwnerRequirement adminOrOwnerRequirement,
            IUserTimeZoneRetrieverService userTimeZoneRetrieverService)
        {
            this.logger = logger;
            this.userTimeZoneService = userTimeZoneService;
            this.authorizationService = authorizationService;
            this.adminOrOwnerRequirement = adminOrOwnerRequirement;
            this.userTimeZoneRetrieverService = userTimeZoneRetrieverService;
        }

        [HttpGet]
        public Task<IEnumerable<UserTimeZoneResponse>> Get([FromQuery(Name = "diff")] int diff, [FromQuery(Name = "s")] string search)
        {
            int userId = User.GetId();
            return this.userTimeZoneRetrieverService.GetUserTimeZones(userId, diff, search);
        }

        [HttpGet]
        [Route("{id:int}")]
        public Task<IActionResult> Get(int id, [FromQuery(Name="diff")] int diff)
        {
            return AuthorizeAccessToEntity(id, async entity =>
            {
                var response = await userTimeZoneService.GetById(id, diff);

                return Ok(response);
            });
        }

        [HttpPost]
        public Task Create(UserTimeZoneCreateRequest request)
        {
            int userId = User.GetId();
            return userTimeZoneService.Create(userId, request);
        }

        [HttpPut]
        [Route("{id:int}")]
        public Task<IActionResult> Update(int id, UserTimeZoneUpdateRequest request)
        {
            return AuthorizeAccessToEntity(id, async entity =>
            {
                var response = await userTimeZoneService.Update(id, request);

                if (response.Success)
                {
                    return Ok();
                }

                return BadRequest(response);
            });
        }

        [HttpDelete]
        [Route("{id:int}")]
        public Task<IActionResult> Delete(int id)
        {
            return AuthorizeAccessToEntity(id, async entity =>
            {
                var response = await userTimeZoneService.Delete(id);

                if (response.Success)
                {
                    return Ok();
                }

                return BadRequest(response);
            });
        }

        private async Task<IActionResult> AuthorizeAccessToEntity(int entityId,
            Func<UserTimeZoneResponse, Task<IActionResult>> action)
        {
            var entity = await this.userTimeZoneService.GetById(entityId);

            var authResponse = await authorizationService.AuthorizeAsync(User, entity, adminOrOwnerRequirement);

            if (authResponse.Succeeded)
            {
                return await action(entity);
            }

            return Forbid();
        }
    }
}
