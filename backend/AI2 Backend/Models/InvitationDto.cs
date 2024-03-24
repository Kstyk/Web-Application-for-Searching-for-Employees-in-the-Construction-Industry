using AI2_Backend.Enums;
using Swashbuckle.AspNetCore.Annotations;
using System.Text.Json.Serialization;

namespace AI2_Backend.Models
{
    public class InvitationDto
    {
        public int EmployeeId { get; set; }
        public string EmployeeEmail {  get; set; }
        public string Company {  get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string CreatedAt { get; set; }


        [Newtonsoft.Json.JsonConverter(typeof(JsonStringEnumConverter))]

        public InvitationStatus Status { get; set; }
    }
}
