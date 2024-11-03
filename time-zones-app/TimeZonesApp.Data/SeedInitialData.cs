using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using TimeZonesApp.Data.Entities;
using TimeZonesApp.Infrastructure;

namespace TimeZonesApp.Data
{
    public static class InitialData
    {
        public static async Task Seed(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            string password = "Qwerty123!";

            var userRoles = new[]
            {
                (
                    User: new User
                    {
                        FirstName = "user",
                        LastName = "user",
                        Email = "user@user.com",
                        UserName = "user@user.com"
                    },
                    Role: new Role
                    {
                        Name = Roles.User
                    }
                ),
                (
                    User: new User
                    {
                        FirstName = "admin",
                        LastName = "admin",
                        Email = "admin@admin.com",
                        UserName = "admin@admin.com"
                    },
                    Role: new Role
                    {
                        Name = Roles.Admin
                    }
                ),
                (
                    User: new User
                    {
                        FirstName = "usermanager",
                        LastName = "usermanager",
                        Email = "usermanager@usermanager.com",
                        UserName = "usermanager@usermanager.com"
                    },
                    Role: new Role
                    {
                        Name = Roles.UserManager
                    }
                )
            };

            foreach (var userRole in userRoles)
            {
                var existingUser = await userManager.FindByEmailAsync(userRole.User.Email);
                var existingRole = await roleManager.FindByNameAsync(userRole.Role.Name);

                if (existingUser == null)
                {
                    await userManager.CreateAsync(userRole.User, password);
                    existingUser = userRole.User;
                }

                if (existingRole == null)
                {
                    await roleManager.CreateAsync(userRole.Role);
                    existingRole = userRole.Role;
                }

                var isInRole = await userManager.IsInRoleAsync(existingUser, existingRole.Name);
                if (!isInRole)
                {
                    await userManager.AddToRoleAsync(existingUser, existingRole.Name);
                }
            }
        }
    }
}
