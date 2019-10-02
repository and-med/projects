using FluentValidation;
using TimeZonesApp.Auth.Contracts.Requests;

namespace TimeZonesApp.Auth.Validation
{
    public class RefreshTokenRequestValidation : AbstractValidator<RefreshTokenRequest>
    {
        public RefreshTokenRequestValidation()
        {
            RuleFor(x => x.Token)
                .NotEmpty();

            RuleFor(x => x.RefreshToken)
                .NotEmpty();
        }
    }
}
