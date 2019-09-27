using TimeZonesApp.Data.Entities;
using TimeZonesApp.Domain.Mappers.Infrastructure;
using TimeZonesApp.Domain.Models;

namespace TimeZonesApp.Domain.Mappers
{
    public class UserTimeZoneMapper : OneWayEntitiesMapper<UserTimeZone, UserTimeZoneGetResponse>
    {
        public override UserTimeZoneGetResponse Map(UserTimeZone entity)
        {
            return new UserTimeZoneGetResponse
            {
                Id = entity.Id,
                Name = entity.Name,
                CityName = entity.CityName,
                GMT = entity.GMT,
                OwnerId = entity.OwnerId
            };
        }
    }
}
