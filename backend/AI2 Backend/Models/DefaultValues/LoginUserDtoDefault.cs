using Swashbuckle.AspNetCore.Filters;

namespace AI2_Backend.Models.DefaultValues
{
    public class LoginUserDtoDefault : IExamplesProvider<LoginUserDto>
    {
        public LoginUserDto GetExamples()
        {
            return new LoginUserDto
            {
                Email = "adam@gmail.com",
                Password = "1234"
            };
        }
    }
}
