using Microsoft.AspNetCore.Authorization;

namespace TimeZonesApp.Api.Auth.Authorization
{
    public class AdminOrOwnerRequirement : IAuthorizationRequirement
    {
    }
}
