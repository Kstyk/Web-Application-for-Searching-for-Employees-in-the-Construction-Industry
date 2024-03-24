using AI2_Backend.Enums;
using System.Text.Json.Serialization;

namespace AI2_Backend.Models
{
    public class InvitationEmployeeDto
    {
            public int EmployeeId { get; set; }
            public string RecruiterEmail { get; set; }
            public string Company { get; set; }
            public string CreatedAt { get; set; }

            [Newtonsoft.Json.JsonConverter(typeof(JsonStringEnumConverter))]

            public InvitationStatus Status { get; set; }
        
    }
}
