namespace TimeZonesApp.Domain.Contracts.Requests
{
    public class UserTimeZoneUpdateRequest
    {
        public string Name { get; set; }
        public string CityName { get; set; }
        public int GMT { get; set; }
    }
}
