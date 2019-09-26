using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using TimeZonesApp.Domain.Models;
using TimeZonesApp.Domain.Services;

namespace TimeZonesApp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserTimeZonesController : ControllerBase
    {
        private readonly ILogger<UserTimeZonesController> logger;

        private readonly IUserTimeZoneService userTimeZoneService;

        public UserTimeZonesController(ILogger<UserTimeZonesController> logger, 
            IUserTimeZoneService userTimeZoneService)
        {
            this.logger = logger;
            this.userTimeZoneService = userTimeZoneService;
        }

        [HttpGet]
        public Task<IEnumerable<UserTimeZoneDto>> Get()
        {
            // TODO: populate userId with correct value;
            int userId = 1;
            return this.userTimeZoneService.GetUserTimeZones(userId);
        }

        [HttpPost]
        public Task Create(UserTimeZoneCreateDto createDto)
        {
            // TODO: set createDto.OwnerId
            return userTimeZoneService.CreateUserTimeZone(createDto);
        }
    }
}
