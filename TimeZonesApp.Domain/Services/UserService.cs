using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeZonesApp.Data.Entities;
using TimeZonesApp.Data.Infrastructure;
using TimeZonesApp.Domain.Contracts.Requests.User;
using TimeZonesApp.Domain.Contracts.Responses.User;
using TimeZonesApp.Domain.Mappers.Infrastructure;
using TimeZonesApp.Infrastructure.ResponseModels;

namespace TimeZonesApp.Domain.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> userRepository;

        private readonly UserManager<User> userManager;

        private readonly IOneWayEntitiesMapper<User, UserResponse> mapper;

        public UserService(IRepository<User> userRepository, 
            UserManager<User> userManager,
            IOneWayEntitiesMapper<User, UserResponse> mapper)
        {
            this.userRepository = userRepository;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        public async Task<Response> Create(UserCreateRequest request)
        {
            var existing = await userManager.FindByEmailAsync(request.Email);

            var response = new Response();

            if (existing == null)
            {
                var user = new User
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    UserName = request.Email
                };

                var creationResult = await userManager.CreateAsync(user, request.Password);

                if (creationResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, request.Role);
                }
                else
                {
                    response = new Response(creationResult.Errors.Select(e => e.Description));
                }
            }
            else
            {
                response = new Response(new[] { "User with such an email already exists" });
            }

            return response;
        }

        public async Task<Response> Update(int userId, UserUpdateRequest request)
        {
            var response = new Response();

            var user = await userRepository.SingleOrDefaultAsync(u => u.Id == userId, u => u.UserRoles, ur => ur.Role);

            if (user == null)
            {
                response = new Response(new[] { "User with this id does not exist " });
            }

            if (response.Success && request.Email != user.Email)
            {
                var existing = await userManager.FindByEmailAsync(request.Email);

                if (existing != null)
                {
                    response = new Response(new[] { "User with such an email already exists " });
                }
            }

            if (response.Success)
            {
                var currRole = user.UserRoles.Select(ur => ur.Role.Name).FirstOrDefault();

                if (currRole != request.Role)
                {
                    await userManager.RemoveFromRoleAsync(user, currRole);
                    await userManager.AddToRoleAsync(user, request.Role);
                }

                user.FirstName = request.FirstName;
                user.LastName = request.LastName;
                user.Email = request.Email;
                user.UserName = request.Email;

                await userManager.UpdateAsync(user);
            }

            return response;
        }

        public async Task<Response> Delete(int id)
        {
            var response = new Response();
            var user = await userManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                response = new Response(new[] { "User with this id does not exist" });
            }
            else
            {
                await userManager.DeleteAsync(user);
            }

            return response;
        }

        public async Task<IEnumerable<UserResponse>> Get()
        {
            var users = await userRepository.GetAsync(null, u => u.UserRoles, ur => ur.Role);

            return mapper.Map(users);
        }

        public async Task<DataResponse<UserResponse>> GetById(int id)
        {
            var user = await userRepository.SingleOrDefaultAsync(u => u.Id == id, 
                u => u.UserRoles, ur => ur.Role);

            if (user == null)
            {
                return new DataResponse<UserResponse>(new[] { "The user was not found " });
            }

            return new DataResponse<UserResponse>(mapper.Map(user));
        }
    }
}
