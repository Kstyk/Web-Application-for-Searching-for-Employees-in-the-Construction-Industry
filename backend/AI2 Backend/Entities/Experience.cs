using System.ComponentModel.DataAnnotations;

namespace AI2_Backend.Entities
{
    public class Experience
    {
        public int Id { get; set; }
        public int StartYear { get; set; }
        public int? EndYear { get; set; }
        [MaxLength(10000)]
        public string? Description { get; set; }
        [MaxLength(255)]
        public string Company { get; set; }
        public ICollection<UserExperience> UserExperiences { get; set; } = new List<UserExperience>();

    }
}
