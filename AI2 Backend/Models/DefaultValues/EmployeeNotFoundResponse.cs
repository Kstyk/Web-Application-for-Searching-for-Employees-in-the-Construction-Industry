using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Filters;
using static AI2_Backend.Models.DefaultValues.EmployeeNotFoundResponse;
using Swashbuckle.AspNetCore.Annotations;

namespace AI2_Backend.Models.DefaultValues
{
    
    public class EmployeeNotFoundResponse : IExamplesProvider<UserNotFoundExampleTemplate>
    {
        public class UserNotFoundExampleTemplate
        {
            public string Type { get; set; }
            public string Title { get; set; }
            public int Status { get; set; }


            public UserNotFoundExampleTemplate()
            {

            }
        }
        public UserNotFoundExampleTemplate GetExamples()
        {
            return new UserNotFoundExampleTemplate()
            {
                Type = "https://tools.ietf.org/html/rfc7231#section-6.5.4",
                Title = "Not Found",
                Status = 404
            };
        }
    }
}
