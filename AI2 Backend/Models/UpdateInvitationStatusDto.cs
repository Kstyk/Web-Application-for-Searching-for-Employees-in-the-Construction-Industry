using AI2_Backend.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace AI2_Backend.Models
{
    public class UpdateInvitationStatusDto
    {
        [Required(ErrorMessage = "Pole 'Status' jest wymagane.")]
        [Newtonsoft.Json.JsonConverter(typeof(JsonStringEnumConverter))]
        public InvitationStatus Status { get; set; }
    }
}
