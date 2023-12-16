using AI2_Backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace AI2_Backend.Models
{
    public class UpdateInvitationStatusDto
    {
        [Required(ErrorMessage = "Pole 'Status' jest wymagane.")]
        public InvitationStatus Status { get; set; }
    }
}
