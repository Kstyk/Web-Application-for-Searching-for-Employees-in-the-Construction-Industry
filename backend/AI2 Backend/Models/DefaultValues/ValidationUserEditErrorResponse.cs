using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Filters;
using static AI2_Backend.Models.DefaultValues.ValidationUserEditErrorResponse;

namespace AI2_Backend.Models.DefaultValues
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ValidationUserEditErrorResponse : IExamplesProvider<ValidationExampleTemplate>
    {
        public class ValidationExampleTemplate
        {
            public Dictionary<string, string[]> Errors { get; set; }
            public string Type { get; set; }
            public string Title { get; set; }
            public int Status { get; set; }
        }

        public ValidationExampleTemplate GetExamples()
        {
            return new ValidationExampleTemplate()
            {
                Errors = new Dictionary<string, string[]>
                {
                    { "Voivodeship", new[] { "Invalid value." } }
                },

                Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                Title = "Error",
                Status = 400
            };
        }
    }

}
