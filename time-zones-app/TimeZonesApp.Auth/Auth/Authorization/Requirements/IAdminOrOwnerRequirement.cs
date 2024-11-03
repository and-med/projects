using Microsoft.AspNetCore.Authorization;

namespace TimeZonesApp.Auth.Authorization.Requirements
{
    public interface IAdminOrOwnerRequirement : IAuthorizationRequirement
    {
    }
}
