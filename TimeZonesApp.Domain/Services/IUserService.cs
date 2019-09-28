using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Domain.Contracts.Requests.User;
using TimeZonesApp.Domain.Contracts.Responses.User;

namespace TimeZonesApp.Domain.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponse>> Get();
        Task<UserResponse> GetById(int id);
        Task Create(UserCreateRequest request);
        Task Update(int userId, UserUpdateRequest request);
        Task Delete(int id, int currentUserId);
    }
}
