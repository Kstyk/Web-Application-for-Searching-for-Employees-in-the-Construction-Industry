namespace AI2_Backend.Entities
{
    public class UserExperience
    {
        public int Id { get; set; }
        public int ExperienceId { get; set; }
        public virtual Experience Experience { get; set; }
        public int EmployeeId { get; set; }
        public virtual User Employee { get; set; }
    }
}
