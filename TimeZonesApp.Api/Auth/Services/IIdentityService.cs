using System.Threading.Tasks;
using TimeZonesApp.Api.Auth.Models;
using TimeZonesApp.Api.Auth.Contracts.Requests;

namespace TimeZonesApp.Api.Auth.Services
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> RegisterAsync(UserRegistrationRequest request);

        Task<AuthenticationResult> LoginAsync(UserLoginRequest request);

        Task<AuthenticationResult> RefreshTokenAsync(RefreshTokenRequest request);
    }
}
