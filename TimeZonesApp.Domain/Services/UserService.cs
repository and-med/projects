using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeZonesApp.Data.Entities;
using TimeZonesApp.Data.Infrastructure;
using TimeZonesApp.Domain.Contracts.Requests.User;
using TimeZonesApp.Domain.Contracts.Responses.User;
using TimeZonesApp.Domain.Mappers.Infrastructure;

namespace TimeZonesApp.Domain.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWorkFactory uowFactory;

        private readonly UserManager<User> userManager;

        private readonly IOneWayEntitiesMapper<User, UserResponse> mapper;

        public UserService(IUnitOfWorkFactory uowFactory, 
            UserManager<User> userManager,
            IOneWayEntitiesMapper<User, UserResponse> mapper)
        {
            this.uowFactory = uowFactory;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        public async Task Create(UserCreateRequest request)
        {
            var existing = await userManager.FindByEmailAsync(request.Email);

            if (existing == null)
            {
                var user = new User
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    UserName = request.Email
                };

                await userManager.CreateAsync(user, request.Password);
                await userManager.AddToRolesAsync(user, request.Roles);
            }
        }

        public async Task Update(int userId, UserUpdateRequest request)
        {
            using (var uow = uowFactory.GetUnitOfWork())
            {
                var repository = uow.GetRepository<User>();

                var user = await repository.SingleOrDefaultAsync(u => u.Id == userId, u => u.UserRoles, ur => ur.Role);

                var currRoles = user.UserRoles.Select(ur => ur.Role.Name);

                if (request.Roles.Count() != currRoles.Count() || !request.Roles.All(currRoles.Contains))
                {
                    await userManager.RemoveFromRolesAsync(user, currRoles);
                    await userManager.AddToRolesAsync(user, request.Roles);
                }

                user.FirstName = request.FirstName;
                user.LastName = request.LastName;
                user.Email = request.Email;
                user.UserName = request.Email;

                await userManager.UpdateAsync(user);
            }
        }

        public async Task Delete(int id, int currentUserId)
        {
            if (id != currentUserId)
            {
                var user = await userManager.FindByIdAsync(id.ToString());
                await userManager.DeleteAsync(user);
            }
        }

        public async Task<IEnumerable<UserResponse>> Get()
        {
            using (var uow = uowFactory.GetUnitOfWork())
            {
                var repository = uow.GetRepository<User>();

                var users = await repository.GetAsync(null, u => u.UserRoles, ur => ur.Role);

                return mapper.Map(users);
            }
        }

        public async Task<UserResponse> GetById(int id)
        {
            using (var uow = uowFactory.GetUnitOfWork())
            {
                var repository = uow.GetRepository<User>();

                var users = await repository.SingleOrDefaultAsync(u => u.Id == id, 
                    u => u.UserRoles, ur => ur.Role);

                return mapper.Map(users);
            }
        }
    }
}
