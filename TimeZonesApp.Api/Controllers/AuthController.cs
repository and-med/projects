using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TimeZonesApp.Api.Auth.Contracts.Response;
using TimeZonesApp.Api.Auth.Services;
using TimeZonesApp.Api.Authorization.Contracts.Requests;
using TimeZonesApp.Infrastructure;

namespace TimeZonesApp.Api.Controllers
{
    [ApiController]
    [Route(Routes.Auth.Base)]
    public class AuthController : ControllerBase
    {
        private readonly IIdentityService identityService;

        public AuthController(IIdentityService identityService)
        {
            this.identityService = identityService;
        }

        [HttpPost(Routes.Auth.Register)]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequest request)
        {
            var authResponse = await this.identityService.Register(request);

            if (!authResponse.Success)
            {
                return BadRequest(new AuthFailedResponse
                {
                    Errors = authResponse.Errors
                });
            }

            return Ok(new AuthSuccessResponse
            {
                Token = authResponse.Token
            });
        }
    }
}
