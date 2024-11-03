using System;

namespace TimeZonesApp.Infrastructure.Models
{
    public class JwtSettings
    {
        public string Secret { get; set; }

        public TimeSpan TokenLifetime { get; set; }
    }
}
