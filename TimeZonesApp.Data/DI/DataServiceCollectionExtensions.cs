using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TimeZonesApp.Data.Entities;
using TimeZonesApp.Data.Infrastructure;

namespace TimeZonesApp.Data.DI
{
    public static class DataServiceCollectionExtensions
    {
        public static void AddDataServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<TimeZonesContext>(options =>
                options.UseSqlite(configuration.GetConnectionString("TimeZonesDb")));

            services.AddIdentityCore<User>()
                .AddRoles<Role>()
                .AddEntityFrameworkStores<TimeZonesContext>();

            services.AddScoped(typeof(IRepository<>), typeof(GenericEfRepository<>));
        }
    }
}
