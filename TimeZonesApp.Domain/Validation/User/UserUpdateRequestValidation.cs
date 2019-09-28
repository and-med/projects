using FluentValidation;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using TimeZonesApp.Data.Entities;
using TimeZonesApp.Domain.Contracts.Requests.User;
using TimeZonesApp.Infrastructure;

namespace TimeZonesApp.Domain.Validation
{
    public class UserUpdateRequestValidation : AbstractValidator<UserUpdateRequest>
    {
        public UserUpdateRequestValidation(UserManager<User> userManager)
        {
            RuleFor(x => x.FirstName)
                .NotEmpty();

            RuleFor(x => x.LastName)
                .NotEmpty();

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
