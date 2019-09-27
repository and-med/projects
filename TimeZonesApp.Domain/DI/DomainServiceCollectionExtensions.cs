using Microsoft.Extensions.DependencyInjection;
using TimeZonesApp.Data.Entities;
using TimeZonesApp.Domain.Mappers;
using TimeZonesApp.Domain.Mappers.Infrastructure;
using TimeZonesApp.Domain.Models;
using TimeZonesApp.Domain.Services;

namespace TimeZonesApp.Domain.DI
{
    public static class DomainServiceCollectionExtensions
    {
        public static void AddDomainServices(this IServiceCollection services)
        {
            services.AddScoped<IUserTimeZoneService, UserTimeZoneService>();

            services.AddScoped<IOneWayEntitiesMapper<UserTimeZone, UserTimeZoneDto>, UserTimeZoneMapper>();
        }
    }
}
