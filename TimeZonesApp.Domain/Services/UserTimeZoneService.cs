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

        private readonly IOneWayEntitiesMapper<UserTimeZone, UserTimeZoneGetResponse> userTimeZoneMapper;

        public UserTimeZoneService(IUnitOfWorkFactory uowFactory, 
            IOneWayEntitiesMapper<UserTimeZone, UserTimeZoneGetResponse> userTimeZoneMapper)
        {
            this.uowFactory = uowFactory;
            this.userTimeZoneMapper = userTimeZoneMapper;
        }

        public async Task CreateUserTimeZone(UserTimeZoneCreateRequest request)
        {
            var userTimeZone = new UserTimeZone
            {
                Name = request.Name,
                CityName = request.CityName,
                GMT = request.GMT,
                OwnerId = request.UserId
            };

            using (var uow = this.uowFactory.GetUnitOfWork())
            {
                var repository = uow.GetRepository<UserTimeZone>();
                repository.Create(userTimeZone);

                await uow.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<UserTimeZoneGetResponse>> GetUserTimeZones(int userId)
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
