using Swashbuckle.AspNetCore.Filters;
using Microsoft.AspNetCore.Mvc;

namespace AI2_Backend.Models.DefaultValues
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class RegisterUserCreatedResponse : IExamplesProvider<UserProfileDto>
    {
        public UserProfileDto GetExamples()
        {
            return new UserProfileDto()
            {
                Id = 1,
                Email = "amaliniak@gmail.com",
                RoleId = 1,

            };
        }
    }
}
