using System.ComponentModel.DataAnnotations;

namespace AI2_Backend.Enums
{
    public enum InvitationStatus
    {
        [Display(Name = "Nowe")]
        NEW,

        [Display(Name = "Anulowane")]
        CANCEL,

        [Display(Name = "Odbyte")]
        COMPLETED,
    }
}
