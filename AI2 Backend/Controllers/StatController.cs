using AI2_Backend.Models;
using AI2_Backend.Models.DefaultValues;
using AI2_Backend.Models.Queries;
using AI2_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.Filters; 

namespace AI2_Backend.Controllers
{
    [Route("api/stat")]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    [ApiController]
    public class StatController : ControllerBase
    {
        private IStatService _statService;

        public StatController(IStatService statService)
        {
            _statService = statService;
        }


        [HttpGet("qualifications-stat")]
        [SwaggerOperation(Summary = "Pobierz statystyki dla kwalifikacji")]
        [SwaggerResponse(200, "Pomyślnie pobrano statystyki dla kwalifikacji", typeof(List<QualificationStatDto>))]
        public ActionResult<IEnumerable<QualificationStatDto>> GetQualificationsStat([FromQuery] StatQuery query)
        {
            var qualificationsStat = _statService.GetQualificationsStat(query);

            return Ok(qualificationsStat);
        }

        [HttpPost("update-visits-stat/{employeeId}")]
        [SwaggerOperation(Summary = "Aktualizacja statystyk", Description = "Aktulaliacja statystyk visit pracownika.")]
        [SwaggerResponse(200, "Statystyki zaktualizowano pomyślnie")]
        [SwaggerResponse(404, "Nie istnieje pracownik o takim ID")]
        public ActionResult UpdateVisitsStat([FromRoute] int employeeId)
        {
            try
            {
                var isSaved = _statService.UpdateVisitsStat(employeeId);
                if (!isSaved)
                {
                    return NotFound();
                }
            }
            catch (Exception)
            {
                return NoContent();
            }

            return Ok(new { Message = "Zaktualizowano statystyki visit" });
        }
    }
}
