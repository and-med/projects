using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Api.Auth.Helpers;
using TimeZonesApp.Domain.Contracts.Requests.User;
using TimeZonesApp.Domain.Contracts.Responses.User;
using TimeZonesApp.Domain.Services;
using TimeZonesApp.Infrastructure;

namespace TimeZonesApp.Api.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
        Roles = Roles.UserManager + "," + Roles.Admin)]
    [Route(Routes.Users.Base)]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public Task<IEnumerable<UserResponse>> Get()
        {
            return this.userService.Get();
        }

        [HttpGet]
        [Route("{id:int}")]
        public Task<UserResponse> Get(int id)
        {
            return this.userService.GetById(id);
        }

        [HttpPost]
        public Task Create(UserCreateRequest request)
        {
            return userService.Create(request);
        }

        [HttpPut]
        [Route("{id:int}")]
        public Task Update(int id, UserUpdateRequest request)
        {
            return userService.Update(id, request);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public Task Delete(int id)
        {
            int currentUserId = User.GetId();

            return userService.Delete(id, currentUserId);
        }
    }
}
