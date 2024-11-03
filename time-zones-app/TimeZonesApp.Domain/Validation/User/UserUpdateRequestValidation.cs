using FluentValidation;
using TimeZonesApp.Domain.Contracts.Requests.User;

namespace TimeZonesApp.Domain.Validation.User
{
    public class UserUpdateRequestValidation : AbstractValidator<UserUpdateRequest>
    {
    }
}
