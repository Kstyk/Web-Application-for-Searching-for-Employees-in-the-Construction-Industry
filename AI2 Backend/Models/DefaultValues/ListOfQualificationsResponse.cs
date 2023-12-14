using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Filters;
using System.Text.Json.Serialization;

namespace AI2_Backend.Models.DefaultValues
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ListOfQualificationsResponse : IExamplesProvider<List<QualificationDto>>
    {
        public List<QualificationDto> GetExamples()
        {
            return new List<QualificationDto> {
                new QualificationDto() {
                    Id = 2,
                    Name = "Murarz",
                },
                new QualificationDto()
                {
                    Id = 3,
                    Name = "Tynkarz"
                }
            };
        }
    }
}
