using Microsoft.Extensions.DependencyInjection;
using TimeZonesApp.Data.Entities;
using TimeZonesApp.Domain.Contracts.Responses;
using TimeZonesApp.Domain.Contracts.Responses.User;
using TimeZonesApp.Domain.Mappers;
using TimeZonesApp.Domain.Mappers.Infrastructure;
using TimeZonesApp.Domain.Services;

namespace TimeZonesApp.Domain.DI
{
    public static class DomainServiceCollectionExtensions
    {
        public static void AddDomainServices(this IServiceCollection services)
        {
            services.AddScoped<IUserTimeZoneService, UserTimeZoneService>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IOneWayEntitiesMapper<UserTimeZone, UserTimeZoneResponse>, UserTimeZoneMapper>();
            services.AddScoped<IOneWayEntitiesMapper<User, UserResponse>, UsersMapper>();
        }
    }
}
