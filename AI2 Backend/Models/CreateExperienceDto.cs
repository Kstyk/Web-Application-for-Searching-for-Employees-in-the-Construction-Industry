using AI2_Backend.Entities;

namespace AI2_Backend.Models
{
    public class CreateExperienceDto
    {
        public int StartYear { get; set; }
        public int? EndYear { get; set; }
        public string? Description { get; set; }
        public string Company { get; set; }
    }
}
