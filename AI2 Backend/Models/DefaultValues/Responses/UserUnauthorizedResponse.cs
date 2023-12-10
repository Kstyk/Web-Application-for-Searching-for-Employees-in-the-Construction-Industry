using Swashbuckle.AspNetCore.Filters;

namespace AI2_Backend.Models.DefaultValues.Responses
{
    public class UserUnauthorizedResponse : IExamplesProvider<string>
    {
        public string GetExamples()
        {
            return "You're not logged in.";
        }
    }
}
