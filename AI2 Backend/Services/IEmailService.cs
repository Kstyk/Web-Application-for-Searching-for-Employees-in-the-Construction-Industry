using AI2_Backend.Models;

namespace AI2_Backend.Services
{
    public interface IEmailService
    {
        void SendMail(InvitationRequestDto inv);
    }
}
