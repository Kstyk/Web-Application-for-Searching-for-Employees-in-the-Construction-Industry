using AI2_Backend.Entities;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace AI2_Backend.Models.DefaultValues
{
    public class RegisterUserDtoDefault : IExamplesProvider<RegisterUserDto>
    {
  
        public RegisterUserDto GetExamples()
        {
            return new RegisterUserDto
            {
                Email = "adam@gmail.com",
                Password = "1234",
                ConfirmPassword = "1234",
                RoleId = 1,
                FirstName = "Adam",
                LastName = "Głowacki"
            };
        }

    }
}
