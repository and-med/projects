﻿using System.Linq;
using TimeZonesApp.Data.Entities;
using TimeZonesApp.Domain.Contracts.Responses.User;
using TimeZonesApp.Domain.Mappers.Infrastructure;

namespace TimeZonesApp.Domain.Mappers
{
    public class UsersMapper : OneWayEntitiesMapper<User, UserResponse>
    {
        public override UserResponse MapEntity(User entity)
        {
            return new UserResponse
            {
                Id = entity.Id,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                Role = entity.UserRoles.Select(r => r.Role.Name).FirstOrDefault()
            };
        }
    }
}
