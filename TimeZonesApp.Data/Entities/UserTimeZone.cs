using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeZonesApp.Data.Entities
{
    public class UserTimeZone
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int OwnerId { get; set; }

        [MaxLength(32)]
        public string Name { get; set; }

        [MaxLength(128)]
        public string CityName { get; set; }
        
        public int GMT { get; set; }

        public virtual User User { get; set; }
    }
}
