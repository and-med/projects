using FluentValidation;
using System.Linq;
using TimeZonesApp.Domain.Contracts.Requests.User;
using TimeZonesApp.Infrastructure;

namespace TimeZonesApp.Domain.Validation.User
{
    public class UserBaseValidator<T> : AbstractValidator<T>
        where T : UserBaseRequest
    {
        public UserBaseValidator()
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
                .MaximumLength(256)
                .EmailAddress();

            RuleFor(x => x.Role)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .Must(role =>
                {
                    return Roles.AllRoles.Contains(role);
                }).WithMessage($"Role must be any of the following values: ({string.Join(" ", Roles.AllRoles)}");
        }
    }
}
