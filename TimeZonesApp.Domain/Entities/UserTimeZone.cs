namespace TimeZonesApp.Domain.Entities
{
    public class UserTimeZone
    {
        public int Id { get; }

        public int OwnerId { get; }

        public string Name { get; }

        public string CityName { get; }

        public int HoursDiffToGMT { get; }

        public int MinutesDiffToGMT { get; }

        public UserTimeZone(int id, int ownerId, string name, string cityName, int hoursDiffToGmt, int minutesDiffToGmt)
        {
            this.Id = id;
            this.OwnerId = ownerId;
            this.Name = name;
            this.CityName = cityName;
            this.HoursDiffToGMT = hoursDiffToGmt;
            this.MinutesDiffToGMT = minutesDiffToGmt;
        }
    }
}
