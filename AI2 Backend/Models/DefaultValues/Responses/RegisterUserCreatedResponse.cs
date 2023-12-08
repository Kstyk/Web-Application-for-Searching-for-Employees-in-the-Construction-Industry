using Swashbuckle.AspNetCore.Filters;

namespace AI2_Backend.Models.DefaultValues.Responses
{
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
