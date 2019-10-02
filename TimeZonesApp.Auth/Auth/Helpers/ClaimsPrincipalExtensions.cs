using System.Linq;
using System.Security.Claims;

namespace TimeZonesApp.Auth.Helpers
{
    public static class ClaimsPrincipalExtensions
    {
        public static int GetId(this ClaimsPrincipal principal)
        {
            return int.Parse(principal.Claims.FirstOrDefault(c => c.Type == "id").Value);
        }
    }
}
