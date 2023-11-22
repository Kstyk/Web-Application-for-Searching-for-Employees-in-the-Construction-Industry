using AI2_Backend.Enums;

namespace AI2_Backend.Entities
{
    public class User
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? AboutMe { get; set; }
        public string? Education { get; set; }
        public Voivodeship? Voivodeship { get; set; }
        public decimal? RequiredPayment { get; set; }
        public ICollection<UserQualification> UserQualifications { get; set; } = new List<UserQualification>();
        public ICollection<UserExperience> UserExperiences { get; set; } = new List<UserExperience>();
        public ICollection<SavedProfile> SavedProfiles { get; set; } = new List<SavedProfile>();
        public ICollection<InvitationHistory> InvitationsHistory { get; set; } = new List<InvitationHistory>();
        public virtual UserPreferences? UserPreferences { get; set; }

        

    }
}
