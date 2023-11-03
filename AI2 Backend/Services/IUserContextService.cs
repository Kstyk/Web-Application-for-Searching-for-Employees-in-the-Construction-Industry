using System.Security.Claims;

namespace AI2_Backend.Services
{
    public interface IUserContextService
    {
        ClaimsPrincipal? User { get; }
        int? GetUserId { get; }

    }
}