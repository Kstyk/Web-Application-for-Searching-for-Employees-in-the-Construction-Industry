namespace AI2_Backend.Entities
{
    public class SavedProfile
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public virtual User? Employee { get; set; }
        public int RecruiterId { get; set; }
        public virtual User? Recruiter { get; set; }
    }
}
