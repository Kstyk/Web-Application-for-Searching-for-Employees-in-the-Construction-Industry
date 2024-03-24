using Swashbuckle.AspNetCore.Filters;
using Microsoft.AspNetCore.Mvc;

namespace AI2_Backend.Models.DefaultValues
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class LoginUserSuccesfulResponse : IExamplesProvider<string>
    {
        public string GetExamples()
        {
            return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        }
    }
}
