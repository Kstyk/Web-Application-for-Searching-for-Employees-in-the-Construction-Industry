using AI2_Backend.Enums;
using Swashbuckle.AspNetCore.Filters;

namespace AI2_Backend.Models.DefaultValues
{
    public class UpdateUserDtoDefault : IExamplesProvider<UpdateUserDto>
    {
        public UpdateUserDto GetExamples()
        {
            return new UpdateUserDto
            {
                FirstName = "Adam",
                LastName = "Kowal",
                AboutMe = "Cześć, jestem Adam",
                Education = "Ukończyłem Uniwersytet Warszawski",
                Voivodeship = Voivodeship.mazowieckie,
                RequiredPayment = 2500,
                QualificationsToAdd = new List<int> { 1, 2, 3},
                Experiences = new List<CreateExperienceDto> { 
                    new CreateExperienceDto
                    {
                        StartYear = 2005,
                        EndYear = 2006,
                        Company = "ABC sp. z o.o.",
                        Description = "Rok pracy na stanowisku brygadzisty"
                    }
                }
            };
        }
    }
}
