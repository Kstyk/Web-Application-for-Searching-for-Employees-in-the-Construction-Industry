using AI2_Backend.Models;
using AI2_Backend.Models.DefaultValues;
using AI2_Backend.Models.Queries;
using AI2_Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.Filters;

namespace AI2_Backend.Controllers
{
    [Route("api/employees")]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [ProducesResponseType(typeof(UserProfileDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [SwaggerOperation("Pobierz profil pracownika po ID.")]
        [HttpGet("{employeeId}")]
        public ActionResult<UserProfileDto> GetUserProfile([FromRoute] int employeeId)
        {
            var userProfile = _employeeService.GetEmployeeProfile(employeeId);

            if (userProfile != null)
            {
                return Ok(userProfile);
            }
            return NotFound();
        }

        [ProducesResponseType(typeof(IEnumerable<UserProfileDto>), StatusCodes.Status200OK)]
        [SwaggerOperation("Wyszukaj pracowników.")]
        [HttpGet("")]
        public ActionResult<IEnumerable<UserProfileDto>> GetAllEmployees([FromQuery] EmployeeQuery query)
        {
            var employees = _employeeService.GetAll(query);

            return Ok(employees);
        }
    }
}
