using AI2_Backend.Enums;

namespace AI2_Backend.Entities
{
    public class InvitationHistory
    {
        public int Id { get; set; }
        public string Company { get; set; } = string.Empty;
        public DateTime DateOfSending { get; set; }
        public int RecruiterId { get; set; }
        public User Recruiter { get; set; }
        public int EmployeeId { get; set; } 
        public User Employee { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public InvitationStatus Status { get; set; } = InvitationStatus.NEW;
        
    }
}
