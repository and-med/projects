using FluentValidation;
using TimeZonesApp.Auth.Contracts.Requests;

namespace TimeZonesApp.Auth.Validation
{
    public class UserRegistrationRequestValidation : AbstractValidator<UserRegistrationRequest>
    {
        public UserRegistrationRequestValidation()
        {
            RuleFor(x => x.FirstName)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MaximumLength(256);

            RuleFor(x => x.LastName)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MaximumLength(256);

            RuleFor(x => x.Email)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.Password)
                .NotEmpty();
        }
    }
}
