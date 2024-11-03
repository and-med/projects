using System.Threading.Tasks;
using TimeZonesApp.Auth.Models;
using TimeZonesApp.Auth.Contracts.Requests;

namespace TimeZonesApp.Auth.Services
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> RegisterAsync(UserRegistrationRequest request);

        Task<AuthenticationResult> LoginAsync(UserLoginRequest request);

        Task<AuthenticationResult> RefreshTokenAsync(RefreshTokenRequest request);
    }
}
