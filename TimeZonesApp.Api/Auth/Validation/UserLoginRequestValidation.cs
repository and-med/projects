using FluentValidation;
using TimeZonesApp.Api.Auth.Contracts.Requests;

namespace TimeZonesApp.Api.Auth.Validation
{
    public class UserLoginRequestValidation : AbstractValidator<UserLoginRequest>
    {
        public UserLoginRequestValidation()
        {
            RuleFor(x => x.Email)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.Password)
                .NotEmpty();
        }
    }
}
