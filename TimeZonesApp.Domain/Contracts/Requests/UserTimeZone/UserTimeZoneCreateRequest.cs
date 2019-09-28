namespace TimeZonesApp.Domain.Contracts.Requests
{
    public class UserTimeZoneCreateRequest
    {
        public string Name { get; set; }
        public string CityName { get; set; }
        public int GMT { get; set; }
    }
}
