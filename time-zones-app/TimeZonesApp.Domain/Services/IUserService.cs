using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Domain.Contracts.Requests.User;
using TimeZonesApp.Domain.Contracts.Responses.User;
using TimeZonesApp.Infrastructure.ResponseModels;

namespace TimeZonesApp.Domain.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponse>> Get();
        Task<DataResponse<UserResponse>> GetById(int id);
        Task<Response> Create(UserCreateRequest request);
        Task<Response> Update(int userId, UserUpdateRequest request);
        Task<Response> Delete(int id);
    }
}
