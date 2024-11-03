using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
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
        public async Task<IActionResult> Get(int id)
        {
            var response = await this.userService.GetById(id);

            if (response.Success)
            {
                return Ok(response.Data);
            }

            return NotFound(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create(UserCreateRequest request)
        {
            var response = await userService.Create(request);

            if (response.Success)
            {
                return Ok();
            }

            return BadRequest(response);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update(int id, UserUpdateRequest request)
        {
            var response = await userService.Update(id, request);

            if (response.Success)
            {
                return Ok();
            }

            return BadRequest(response);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await userService.Delete(id);

            if (response.Success)
            {
                return Ok();
            }

            return BadRequest(response);
        }
    }
}
