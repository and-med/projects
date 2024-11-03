using TimeZonesApp.Data.Entities;
using TimeZonesApp.Domain.Contracts.Responses;
using TimeZonesApp.Domain.Mappers.Infrastructure;

namespace TimeZonesApp.Domain.Mappers
{
    public class UserTimeZoneMapper : OneWayEntitiesMapper<UserTimeZone, UserTimeZoneResponse>
    {
        public override UserTimeZoneResponse MapEntity(UserTimeZone entity)
        {
            return new UserTimeZoneResponse
            {
                Id = entity.Id,
                Name = entity.Name,
                CityName = entity.CityName,
                HoursDiffToGMT = entity.HoursDiffToGMT,
                MinutesDiffToGMT = entity.MinutesDiffToGMT,
                OwnerId = entity.OwnerId,
                OwnerFullName = entity.User.FirstName + " " + entity.User.LastName
            };
        }
    }
}
