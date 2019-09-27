using System.Threading.Tasks;
using TimeZonesApp.Api.Auth.Models;
using TimeZonesApp.Api.Authorization.Contracts.Requests;

namespace TimeZonesApp.Api.Auth.Services
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> Register(UserRegistrationRequest request);
    }
}
