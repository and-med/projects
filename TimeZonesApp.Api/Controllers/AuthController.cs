using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using TimeZonesApp.Api.Auth.Contracts.Requests;
using TimeZonesApp.Api.Auth.Contracts.Response;
using TimeZonesApp.Api.Auth.Services;
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
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthFailedResponse(
                    ModelState.Values.SelectMany(x => x.Errors.Select(e => e.ErrorMessage))));
            }

            var authResponse = await this.identityService.RegisterAsync(request);

            if (!authResponse.Success)
            {
                return BadRequest(new AuthFailedResponse(authResponse.Errors));
            }

            return Ok(new AuthSuccessResponse
            {
                Token = authResponse.Token,
                RefreshToken = authResponse.RefreshToken
            });
        }

        [HttpPost(Routes.Auth.Login)]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
        {
            var authResponse = await this.identityService.LoginAsync(request);

            if (!authResponse.Success)
            {
                return BadRequest(new AuthFailedResponse(authResponse.Errors));
            }

            return Ok(new AuthSuccessResponse
            {
                Token = authResponse.Token,
                RefreshToken = authResponse.RefreshToken
            });
        }

        [HttpPost(Routes.Auth.Refresh)]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest request)
        {
            var authResponse = await this.identityService.RefreshTokenAsync(request);

            if (!authResponse.Success)
            {
                return BadRequest(new AuthFailedResponse(authResponse.Errors));
            }

            return Ok(new AuthSuccessResponse
            {
                Token = authResponse.Token,
                RefreshToken = authResponse.RefreshToken
            });
        }
    }
}
