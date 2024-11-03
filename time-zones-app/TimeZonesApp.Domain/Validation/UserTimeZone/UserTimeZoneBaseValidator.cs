using FluentValidation;
using TimeZonesApp.Domain.Contracts.Requests.UserTimeZone;

namespace TimeZonesApp.Domain.Validation.UserTimeZone
{
    public class UserTimeZoneBaseValidator<T> : AbstractValidator<T>
        where T : UserTimeZoneBaseRequest
    {
        public UserTimeZoneBaseValidator()
        {
            RuleFor(x => x.Name)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MaximumLength(128);

            RuleFor(x => x.CityName)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MaximumLength(128);

            RuleFor(x => x.HoursDiffToGMT)
                .Must(h =>
                {
                    return h >= -14 && h <= 14;
                }).WithMessage("'HoursDiffToGMT' must be an integer between -14 and 14");

            RuleFor(x => x.MinutesDiffToGMT)
                .Must(m =>
                {
                    return m >= 0 && m <= 60;
                }).WithMessage("'MinutesDiffToGMT' must be an integer between 0 and 60");
        }
    }
}
