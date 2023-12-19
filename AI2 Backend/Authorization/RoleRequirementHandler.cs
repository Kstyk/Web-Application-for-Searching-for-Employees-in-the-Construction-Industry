using AI2_Backend.Entities;
using AI2_Backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace AI2_Backend.Authorization
{
    public class RoleRequirementHandler : AuthorizationHandler<RoleRequirement>
    {
        private AIDbContext _context;
        private IUserContextService _userContextService;

        public RoleRequirementHandler(AIDbContext dbContext, IUserContextService userContextService)
        {
            _context = dbContext;
            _userContextService = userContextService;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, RoleRequirement requirement)
        {
            var userId = _userContextService.GetUserId;

            if (userId == null)
            {
                context.Fail();
                return Task.CompletedTask;
            }

            var user = _context.Users.Find(userId);

            var role = _context.Roles.Find(user.RoleId);

            if(role.Name == requirement.RoleName)
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}
