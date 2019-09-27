using System;
using System.Collections.Generic;
using System.Text;

namespace TimeZonesApp.Domain.Models
{
    public class UserTimeZoneDto
    {
        public int Id { get; set; }

        public int OwnerId { get; set; }

        public string Name { get; set; }

        public string CityName { get; set; }
        
        public int GMT { get; set; }
    }
}
