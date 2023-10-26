using System.Security.Claims;

namespace AI2_Backend.Services
{
    public class UserContextService : IUserContextService
    {
        private IHttpContextAccessor _contextAccessor;

        public UserContextService(IHttpContextAccessor httpContextAccessor)
        {
            _contextAccessor = httpContextAccessor;
        }

        public ClaimsPrincipal? User => _contextAccessor.HttpContext?.User;

    }
}

