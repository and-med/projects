using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using TimeZonesApp.Auth.Authorization.Requirements;
using TimeZonesApp.Auth.Helpers;
using TimeZonesApp.Data.Entities;
using TimeZonesApp.Domain.Contracts.Responses;
using TimeZonesApp.Infrastructure;

namespace TimeZonesApp.Auth.Authorization
{
    public class AdminOrOwnerHandler : AuthorizationHandler<AdminOrOwnerRequirement, UserTimeZoneResponse>
    {
        private readonly UserManager<User> userManager;

        public AdminOrOwnerHandler(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context,
            AdminOrOwnerRequirement requirement, 
            UserTimeZoneResponse resource)
        {
            var userId = context.User.GetId();
            var user = await userManager.FindByIdAsync(userId.ToString());
            var roles = await userManager.GetRolesAsync(user);
            var isAdmin = roles.Contains(Roles.Admin);

            if (isAdmin || resource == null || resource.OwnerId == user.Id)
            {
                context.Succeed(requirement);
            }
            else
            {
                context.Fail();
            }
        }
    }
}
