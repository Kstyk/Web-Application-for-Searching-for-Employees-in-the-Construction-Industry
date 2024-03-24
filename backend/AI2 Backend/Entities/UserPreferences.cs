namespace AI2_Backend.Entities
{
    public class UserPreferences
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public virtual User? Employee { get; set; }
        public Boolean IsVisibleProfile { get; set; } = true;
        public Boolean IsVisibleAboutMe { get; set; } = true;
        public Boolean IsVisibleSkills { get; set; } = true;
        public Boolean IsVisibleExperience { get; set; } = true;
        public Boolean IsVisibleEducation { get; set; } = true;
        public Boolean IsVisibleVoivodeship { get; set; } = true;
        public Boolean IsVisibleRequiredPayment { get; set; } = true;
    }
}
