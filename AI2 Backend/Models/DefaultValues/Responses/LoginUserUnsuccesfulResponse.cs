using Swashbuckle.AspNetCore.Filters;

namespace AI2_Backend.Models.DefaultValues.Responses
{
    public class LoginUserUnsuccesfulResponse : IExamplesProvider<string>
    {
        public string GetExamples()
        {
            return "Niepoprawne dane logowania.";
        }
    }
}
