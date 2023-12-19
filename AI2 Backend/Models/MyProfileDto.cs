using AI2_Backend.Entities;
using AI2_Backend.Enums;

namespace AI2_Backend.Models
{
    public class MyProfileDto
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? AboutMe { get; set; }
        public string? Education { get; set; }
        public Voivodeship? Voivodeship { get; set; }
        public decimal? RequiredPayment { get; set; }
        public ICollection<QualificationDto> UserQualifications { get; set; }
        public ICollection<ExperienceDto> UserExperiences { get; set; }

    }
}
