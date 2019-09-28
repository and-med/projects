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

            RuleFor(x => x.Roles)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .Must(roles =>
                {
                    return roles.Count() == roles.Distinct().Count() && roles.All(Roles.AllRoles.Contains);
                }).WithMessage($"Roles must not repeat and be only values of ({string.Join(" ", Roles.AllRoles)}");
        }
    }
}
