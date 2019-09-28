using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Data.Entities;
using TimeZonesApp.Data.Infrastructure;
using TimeZonesApp.Domain.Contracts.Requests;
using TimeZonesApp.Domain.Contracts.Responses;
using TimeZonesApp.Domain.Mappers.Infrastructure;

namespace TimeZonesApp.Domain.Services
{
    public class UserTimeZoneService : IUserTimeZoneService
    {
        private readonly IUnitOfWorkFactory uowFactory;

        private readonly IOneWayEntitiesMapper<UserTimeZone, UserTimeZoneResponse> userTimeZoneMapper;

        public UserTimeZoneService(IUnitOfWorkFactory uowFactory, 
            IOneWayEntitiesMapper<UserTimeZone, UserTimeZoneResponse> userTimeZoneMapper)
        {
            this.uowFactory = uowFactory;
            this.userTimeZoneMapper = userTimeZoneMapper;
        }

        public async Task<IEnumerable<UserTimeZoneResponse>> Get()
        {
            using (var uow = this.uowFactory.GetUnitOfWork())
            {
                var repository = uow.GetRepository<UserTimeZone>();
                var entities = await repository.GetAsync(null, t => t.User);

                return userTimeZoneMapper.Map(entities);
            }
        }

        public async Task<IEnumerable<UserTimeZoneResponse>> GetByUser(int userId)
        {
            using (var uow = this.uowFactory.GetUnitOfWork())
            {
                var repository = uow.GetRepository<UserTimeZone>();
                var entities = await repository.GetAsync(t => t.OwnerId == userId, t => t.User);

                return userTimeZoneMapper.Map(entities);
            }
        }

        public async Task<UserTimeZoneResponse> GetById(int id)
        {
            using (var uow = this.uowFactory.GetUnitOfWork())
            {
                var repository = uow.GetRepository<UserTimeZone>();
                var entity = await repository.SingleOrDefaultAsync(t => t.Id == id, t => t.User);

                return userTimeZoneMapper.Map(entity);
            }
        }

        public async Task Create(int userId, UserTimeZoneCreateRequest request)
        {
            var userTimeZone = new UserTimeZone
            {
                Name = request.Name,
                CityName = request.CityName,
                GMT = request.GMT,
                OwnerId = userId
            };

            using (var uow = this.uowFactory.GetUnitOfWork())
            {
                var repository = uow.GetRepository<UserTimeZone>();
                repository.Create(userTimeZone);

                await uow.SaveChangesAsync();
            }
        }

        public async Task Update(int id, UserTimeZoneUpdateRequest request)
        {
            using (var uow = this.uowFactory.GetUnitOfWork())
            {
                var repository = uow.GetRepository<UserTimeZone>();
                var userTimeZone = await repository.SingleOrDefaultAsync(t => t.Id == id);

                userTimeZone.Name = request.Name;
                userTimeZone.CityName = request.CityName;
                userTimeZone.GMT = request.GMT;

                await uow.SaveChangesAsync();
            }
        }

        public async Task Delete(int id)
        {
            using (var uow = this.uowFactory.GetUnitOfWork())
            {
                var repository = uow.GetRepository<UserTimeZone>();
                var userTimeZone = await repository.SingleOrDefaultAsync(t => t.Id == id);

                repository.Delete(userTimeZone);

                await uow.SaveChangesAsync();
            }
        }
    }
}
