using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace TimeZonesApp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserTimeZonesController : ControllerBase
    {
        private readonly ILogger<UserTimeZonesController> _logger;

        public UserTimeZonesController(ILogger<UserTimeZonesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public void Get()
        {
        }
    }
}
