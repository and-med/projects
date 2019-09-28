using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Data.Entities;
using TimeZonesApp.Data.Infrastructure;
using TimeZonesApp.Domain.Contracts.Requests.UserTimeZone;
using TimeZonesApp.Domain.Contracts.Responses;
using TimeZonesApp.Domain.Mappers.Infrastructure;
using TimeZonesApp.Infrastructure.ResponseModels;

namespace TimeZonesApp.Domain.Services
{
    public class UserTimeZoneService : IUserTimeZoneService
    {
        private readonly IRepository<UserTimeZone> repository;

        private readonly IOneWayEntitiesMapper<UserTimeZone, UserTimeZoneResponse> userTimeZoneMapper;

        public UserTimeZoneService(IRepository<UserTimeZone> repository, 
            IOneWayEntitiesMapper<UserTimeZone, UserTimeZoneResponse> userTimeZoneMapper)
        {
            this.repository = repository;
            this.userTimeZoneMapper = userTimeZoneMapper;
        }

        public async Task<IEnumerable<UserTimeZoneResponse>> Get()
        {
            var entities = await repository.GetAsync(null, t => t.User);

            return userTimeZoneMapper.Map(entities);
        }

        public async Task<IEnumerable<UserTimeZoneResponse>> GetByUser(int userId)
        {
            var entities = await repository.GetAsync(t => t.OwnerId == userId, t => t.User);

            return userTimeZoneMapper.Map(entities);
        }

        public async Task<UserTimeZoneResponse> GetById(int id)
        {
            var entity = await repository.SingleOrDefaultAsync(t => t.Id == id, t => t.User);

            return userTimeZoneMapper.Map(entity);
        }

        public async Task Create(int userId, UserTimeZoneCreateRequest request)
        {
            var userTimeZone = new UserTimeZone
            {
                Name = request.Name,
                CityName = request.CityName,
                HoursDiffToGMT = request.HoursDiffToGMT,
                MinutesDiffToGMT = request.MinutesDiffToGMT,
                OwnerId = userId
            };

            repository.Create(userTimeZone);

            await repository.SaveChangesAsync();
        }

        public async Task<Response> Update(int id, UserTimeZoneUpdateRequest request)
        {
            var response = new Response();
            var userTimeZone = await repository.SingleOrDefaultAsync(t => t.Id == id);

            if (userTimeZone == null)
            {
                response = new Response(new[] { "Entity with such id does not exist" });
            }
            else
            {
                userTimeZone.Name = request.Name;
                userTimeZone.CityName = request.CityName;
                userTimeZone.HoursDiffToGMT = request.HoursDiffToGMT;
                userTimeZone.MinutesDiffToGMT = request.MinutesDiffToGMT;

                await repository.SaveChangesAsync();
            }
            return response;
        }

        public async Task<Response> Delete(int id)
        {
            var response = new Response();
            var userTimeZone = await repository.SingleOrDefaultAsync(t => t.Id == id);

            if (userTimeZone == null)
            {
                response = new Response(new[] { "Entity with such id does not exist" });
            }
            else
            {
                repository.Delete(userTimeZone);

                await repository.SaveChangesAsync();
            }

            return response;
        }
    }
}
