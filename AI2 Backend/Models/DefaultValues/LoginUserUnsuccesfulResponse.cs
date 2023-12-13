using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Filters;

namespace AI2_Backend.Models.DefaultValues
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class LoginUserUnsuccesfulResponse : IExamplesProvider<string>
    {

        public string GetExamples()
        {
            return "Incorrect login details.";
        }
    }
}
