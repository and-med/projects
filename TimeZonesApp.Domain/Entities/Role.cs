namespace TimeZonesApp.Domain.Entities
{
    public class Role
    {
        public int Id { get; }

        public string Name { get; }

        public Role(int id, string name)
        {
            this.Id = id;
            this.Name = name;
        }
    }
}
