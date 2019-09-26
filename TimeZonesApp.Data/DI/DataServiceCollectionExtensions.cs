using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TimeZonesApp.Data.Entities;

namespace TimeZonesApp.Data.DI
{
    public static class DataServiceCollectionExtensions
    {
        public static void AddDataServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<TimeZonesContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("TimeZonesDb")));

            services.AddIdentityCore<User>()
                .AddRoles<Role>()
                .AddEntityFrameworkStores<TimeZonesContext>();
        }
    }
}
