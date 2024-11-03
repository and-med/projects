using System;

namespace TimeZonesApp.Domain.Contracts.Responses
{
    public class UserTimeZoneResponse
    {
        public int Id { get; set; }

        public int OwnerId { get; set; }

        public string OwnerFullName { get; set; }

        public string Name { get; set; }

        public string CityName { get; set; }

        public int HoursDiffToGMT { get; set; }

        public int MinutesDiffToGMT { get; set; }

        public DateTime TimeZoneDateTime { get; set; }

        public TimeSpan DiffToClient { get; set; }
    }
}
