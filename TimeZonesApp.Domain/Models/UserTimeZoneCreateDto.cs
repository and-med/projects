namespace TimeZonesApp.Domain.Models
{
    public class UserTimeZoneCreateDto
    {
        public string Name { get; set; }
        public string CityName { get; set; }
        public int GMT { get; set; }
        public int UserId { get; set; }
    }
}
