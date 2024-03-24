using AI2_Backend.Models;
using AI2_Backend.Models.DefaultValues;
using AI2_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.Filters;

namespace AI2_Backend.Controllers
{
    [Route("api/qualifications")]
    [ApiController]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public class QualificationController : ControllerBase
    {
        private readonly IQualificationService _qualificationService;

        public QualificationController(IQualificationService qualificationService)
        {
            _qualificationService = qualificationService;
        }

        [SwaggerResponseExample(StatusCodes.Status200OK, typeof(ListOfQualificationsResponse))]
        [ProducesResponseType(typeof(ListOfQualificationsResponse), StatusCodes.Status200OK)]
        [SwaggerOperation("Pobierz wszystkie branże.")]
        [HttpGet("")]
        public ActionResult<List<QualificationDto>> GetAllCategories()
        {
            var qualifications = _qualificationService.GetAllQualifications();

            return Ok(qualifications);
        }
    }
}
