namespace TimeZonesApp.Domain.Entities
{
    public class UserTimeZone
    {
        public int Id { get; }

        public int OwnerId { get; }

        public string Name { get; }

        public string CityName { get; }

        public int GMT { get; }

        public UserTimeZone(int id, int ownerId, string name, string cityName, int gmt)
        {
            this.Id = id;
            this.OwnerId = ownerId;
            this.Name = name;
            this.CityName = cityName;
            this.GMT = gmt;
        }
    }
}
