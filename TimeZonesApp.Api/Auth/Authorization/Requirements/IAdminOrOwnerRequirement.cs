using Microsoft.AspNetCore.Authorization;

namespace TimeZonesApp.Api.Auth.Authorization.Requirements
{
    public interface IAdminOrOwnerRequirement : IAuthorizationRequirement
    {
    }
}
