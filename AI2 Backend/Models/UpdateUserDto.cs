using AI2_Backend.Enums;

namespace AI2_Backend.Models
{
    public class UpdateUserDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? AboutMe { get; set; }
        public string? Education { get; set; }
        public Voivodeship? Voivodeship { get; set; }
        public decimal? RequiredPayment { get; set; }
        public List<int>? QualificationsToAdd { get; set; } // Id branż do dodania
        public List<CreateExperienceDto> Experiences { get; set; }

    }
}
