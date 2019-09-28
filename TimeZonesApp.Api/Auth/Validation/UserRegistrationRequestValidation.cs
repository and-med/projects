using FluentValidation;
using TimeZonesApp.Api.Auth.Contracts.Requests;

namespace TimeZonesApp.Api.Auth.Validation
{
    public class UserRegistrationRequestValidation : AbstractValidator<UserRegistrationRequest>
    {
        public UserRegistrationRequestValidation()
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
