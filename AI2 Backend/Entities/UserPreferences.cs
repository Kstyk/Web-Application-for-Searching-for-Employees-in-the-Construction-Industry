namespace AI2_Backend.Entities
{
    public class UserPreferences
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public virtual User? Employee { get; set; }
        public Boolean IsVisibleProfile { get; set; }
        public Boolean IsVisibleAboutMe { get; set; }
        public Boolean IsVisibleSkills { get; set; }
        public Boolean IsVisibleExperience { get; set; }
        public Boolean IsVisibleEducation { get; set; }
        public Boolean IsVisibleVoivodeship { get; set; }
        public Boolean IsVisibleRequiredPayment { get; set; }
    }
}
