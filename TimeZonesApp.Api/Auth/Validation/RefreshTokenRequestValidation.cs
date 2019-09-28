using FluentValidation;
using TimeZonesApp.Api.Auth.Contracts.Requests;

namespace TimeZonesApp.Api.Auth.Validation
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
