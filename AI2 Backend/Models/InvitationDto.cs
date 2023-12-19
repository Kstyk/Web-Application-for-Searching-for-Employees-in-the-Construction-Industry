using AI2_Backend.Enums;
using Swashbuckle.AspNetCore.Annotations;
using System.Text.Json.Serialization;

namespace AI2_Backend.Models
{
    public class InvitationDto
    {
        public string EmployeeEmail {  get; set; }
        public string Company {  get; set; }
        public string CreatedAt { get; set; }

        [Newtonsoft.Json.JsonConverter(typeof(JsonStringEnumConverter))]

        public InvitationStatus Status { get; set; }
    }
}
