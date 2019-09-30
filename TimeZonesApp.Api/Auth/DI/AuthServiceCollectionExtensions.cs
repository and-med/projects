using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TimeZonesApp.Api.Auth.Authorization;
using TimeZonesApp.Api.Auth.Authorization.Requirements;
using TimeZonesApp.Api.Auth.Services;
using TimeZonesApp.Infrastructure.Models;

namespace TimeZonesApp.Api.Auth.DI
{
    public static class AuthServiceCollectionExtensions
    {
        public static void AddAuthServices(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSettings = new JwtSettings();
            configuration.Bind(nameof(JwtSettings), jwtSettings);
            services.AddSingleton(jwtSettings);

            var tokenValidationParameteres = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.Secret)),
                ValidateIssuer = false,
                ValidateAudience = false,
                RequireExpirationTime = false,
                ValidateLifetime = true
            };

            services.AddSingleton(tokenValidationParameteres);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.SaveToken = true;
                x.TokenValidationParameters = tokenValidationParameteres;
            });

            services.AddScoped<IIdentityService, IdentityService>();
            services.AddScoped<IUserTimeZoneRetrieverService, UserTimeZoneRetrieverService>();
            services.AddScoped<IAdminOrOwnerRequirement, AdminOrOwnerRequirement>();
            services.AddScoped<IAuthorizationHandler, AdminOrOwnerHandler>();
        }
    }
}
