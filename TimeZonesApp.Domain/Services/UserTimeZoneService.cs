using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Data.Entities;
using TimeZonesApp.Data.Infrastructure;
using TimeZonesApp.Domain.Mappers.Infrastructure;
using TimeZonesApp.Domain.Models;

namespace TimeZonesApp.Domain.Services
{
    public class UserTimeZoneService : IUserTimeZoneService
    {
        private readonly IUnitOfWorkFactory uowFactory;

        private readonly IOneWayEntitiesMapper<UserTimeZone, UserTimeZoneDto> userTimeZoneMapper;

        public UserTimeZoneService(IUnitOfWorkFactory uowFactory, 
            IOneWayEntitiesMapper<UserTimeZone, UserTimeZoneDto> userTimeZoneMapper)
        {
            this.uowFactory = uowFactory;
            this.userTimeZoneMapper = userTimeZoneMapper;
        }

        public async Task CreateUserTimeZone(UserTimeZoneCreateDto userTimeZoneCreateDto)
        {
            var userTimeZone = new UserTimeZone
            {
                Name = userTimeZoneCreateDto.Name,
                CityName = userTimeZoneCreateDto.CityName,
                GMT = userTimeZoneCreateDto.GMT,
                OwnerId = userTimeZoneCreateDto.UserId
            };

            using (var uow = this.uowFactory.GetUnitOfWork())
            {
                var repository = uow.GetRepository<UserTimeZone>();
                repository.Create(userTimeZone);

                await uow.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<UserTimeZoneDto>> GetUserTimeZones(int userId)
        {
            using (var uow = this.uowFactory.GetUnitOfWork())
            {
                var repository = uow.GetRepository<UserTimeZone>();
                var entities = await repository.GetAsync();

                return userTimeZoneMapper.Map(entities);
            }
        }
    }
}
