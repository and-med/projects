using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TimeZonesApp.Auth.Authorization;
using TimeZonesApp.Auth.Authorization.Requirements;
using TimeZonesApp.Auth.Services;

namespace TimeZonesApp.Auth.DI
{
    public static class AuthServiceCollectionExtensions
    {
        public static void AddAuthServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IIdentityService, IdentityService>();
            services.AddScoped<IUserTimeZoneRetrieverService, UserTimeZoneRetrieverService>();
            services.AddScoped<IAdminOrOwnerRequirement, AdminOrOwnerRequirement>();
            services.AddScoped<IAuthorizationHandler, AdminOrOwnerHandler>();
        }
    }
}
