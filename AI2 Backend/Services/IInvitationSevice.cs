using AI2_Backend.Entities;
using AI2_Backend.Enums;
using AI2_Backend.Models;

namespace AI2_Backend.Services
{
    public interface IInvitationSevice
    {
        void SendMail(InvitationRequestDto inv);
        List<InvitationDto> GetInvitations(int recruiterId);
        List<InvitationEmployeeDto> GetEmployeeInvitations(int  employeeId, InvitationStatus status);
        bool Update(int invitationId, UpdateInvitationStatusDto status);
    }
}
