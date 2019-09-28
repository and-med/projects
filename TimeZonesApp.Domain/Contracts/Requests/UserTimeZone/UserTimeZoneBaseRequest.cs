namespace TimeZonesApp.Domain.Contracts.Requests.UserTimeZone
{
    public class UserTimeZoneBaseRequest
    {
        public string Name { get; set; }

        public string CityName { get; set; }

        public int HoursDiffToGMT { get; set; }

        public int MinutesDiffToGMT { get; set; }
    }
}
