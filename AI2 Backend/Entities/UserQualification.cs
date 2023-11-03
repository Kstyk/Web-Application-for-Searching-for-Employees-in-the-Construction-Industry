namespace AI2_Backend.Entities
{
    public class UserQualification
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int QualificationId { get; set; }
        public Qualification Qualification { get; set; } 
    }
}
