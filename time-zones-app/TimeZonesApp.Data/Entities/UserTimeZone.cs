using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeZonesApp.Data.Entities
{
    public class UserTimeZone
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey(nameof(User))]
        public int OwnerId { get; set; }

        [Required]
        [MaxLength(128)]
        public string Name { get; set; }

        [Required]
        [MaxLength(128)]
        public string CityName { get; set; }
        
        public int HoursDiffToGMT { get; set; }

        public int MinutesDiffToGMT { get; set;  }

        public virtual User User { get; set; }
    }
}
