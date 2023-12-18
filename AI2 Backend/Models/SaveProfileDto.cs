using AI2_Backend.Enums;

namespace AI2_Backend.Models
{
    public class SaveProfileDto
    {
        public int Id { get; set; }
        public string EmployeeEmail { get; set; }
        public string EmployeeFirstName { get; set; }
        public string EmployeeLastName { get; set; }
    }
}
