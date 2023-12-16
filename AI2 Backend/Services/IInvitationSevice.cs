using AI2_Backend.Entities;
using AI2_Backend.Models;

namespace AI2_Backend.Services
{
    public interface IInvitationSevice
    {
        void SendMail(InvitationRequestDto inv);
        List<InvitationDto> GetInvitations(int recruiterId);
        bool Update(int invitationId, UpdateInvitationStatusDto status);
    }
}
