﻿using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<IEnumerable<UserTimeZoneResponse>> Get(int diffToGmt, string search)
        {
            var entities = await repository.GetAsync(t => t.Name.Contains(search) || string.IsNullOrEmpty(search), t => t.User);

            return entities.Select(entity => MapToTimeZoneResponse(entity, diffToGmt));
        }

        public async Task<IEnumerable<UserTimeZoneResponse>> GetByUser(int userId, int diffToGmt, string search)
        {
            var entities = await repository.GetAsync(t => 
            t.OwnerId == userId && (t.Name.Contains(search) || string.IsNullOrEmpty(search)), t => t.User);
            
            return entities.Select(entity => MapToTimeZoneResponse(entity, diffToGmt));
        }

        public async Task<UserTimeZoneResponse> GetById(int id, int diffToGmt = 0)
        {
            var entity = await repository.SingleOrDefaultAsync(t => t.Id == id, t => t.User);

            return MapToTimeZoneResponse(entity, diffToGmt);
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

        private UserTimeZoneResponse MapToTimeZoneResponse(UserTimeZone entity, int diffToGMT)
        {
            var now = DateTime.UtcNow;
            var timeZoneDateTime = now.AddHours(entity.HoursDiffToGMT).AddMinutes(entity.HoursDiffToGMT < 0 ? -entity.MinutesDiffToGMT : entity.MinutesDiffToGMT);
            var clientDateTime = now.AddMinutes(-diffToGMT);
            return new UserTimeZoneResponse
            {
                Id = entity.Id,
                OwnerId = entity.OwnerId,
                OwnerFullName = entity.User.FirstName + entity.User.LastName,
                Name = entity.Name,
                CityName = entity.CityName,
                HoursDiffToGMT = entity.HoursDiffToGMT,
                MinutesDiffToGMT = entity.MinutesDiffToGMT,
                TimeZoneDateTime = timeZoneDateTime,
                DiffToClient = timeZoneDateTime - clientDateTime
            };
        }
    }
}
