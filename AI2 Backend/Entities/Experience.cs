namespace AI2_Backend.Entities
{
    public class Experience
    {
        public int Id { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public string Description { get; set; }
        public string Company { get; set; }
        public ICollection<UserExperience> UserExperiences { get; set; } = new List<UserExperience>();

    }
}
