using Swashbuckle.AspNetCore.Filters;
using Microsoft.AspNetCore.Mvc;

namespace AI2_Backend.Models.DefaultValues
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class UserUnauthorizedResponse : IExamplesProvider<string>
    {
        public string GetExamples()
        {
            return "You're not logged in.";
        }
    }
}
