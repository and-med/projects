using FluentValidation;
using TimeZonesApp.Domain.Contracts.Requests.User;

namespace TimeZonesApp.Domain.Validation.User
{
    public class UserCreateRequestValidator : UserBaseValidator<UserCreateRequest>
    {
        public UserCreateRequestValidator()
        {
            RuleFor(u => u.Password)
                .NotEmpty();
        }
    }
}
