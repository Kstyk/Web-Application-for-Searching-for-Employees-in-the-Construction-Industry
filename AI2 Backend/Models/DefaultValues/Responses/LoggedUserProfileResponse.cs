using AI2_Backend.Entities;
using Swashbuckle.AspNetCore.Filters;

namespace AI2_Backend.Models.DefaultValues.Responses
{
    public class LoggedUserProfileResponse : IExamplesProvider<MyProfileDto>
    {
        public MyProfileDto GetExamples()
        {
            return new MyProfileDto()
            {
                Id = 1,
                RoleId = 2,
                Email = "adam@gmail.com",
                FirstName = "Adam",
                LastName = "Security",
                AboutMe = "I'm from Hungary",
                Education = "University of Budapest",
                Voivodeship = Enums.Voivodeship.dolnośląskie,
                RequiredPayment = 3500,
                UserExperiences = new List<UserExperience>(),
                UserQualifications = new List<QualificationDto>()
            };
        }
    }
}
