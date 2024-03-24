namespace AI2_Backend.Models
{
    public class UserPreferencesDto
    {
        public Boolean? IsVisibleProfile { get; set; } = true;
        public Boolean? IsVisibleAboutMe { get; set; } = true;
        public Boolean? IsVisibleSkills { get; set; } = true;
        public Boolean? IsVisibleExperience { get; set; } = true;
        public Boolean? IsVisibleEducation { get; set; } = true;
        public Boolean? IsVisibleVoivodeship { get; set; } = true;
        public Boolean? IsVisibleRequiredPayment { get; set; } = true;
    }
}
