using Microsoft.AspNetCore.Authorization;

namespace AI2_Backend.Authorization
{
    public class RoleRequirement : IAuthorizationRequirement
    {
        public string RoleName { get; set; }

        public RoleRequirement(string roleName)
        {
            RoleName = roleName;
        }
    }
}
