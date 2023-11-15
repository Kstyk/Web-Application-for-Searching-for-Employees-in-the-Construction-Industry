using AI2_Backend.Models;
using AI2_Backend.Models.Queries;
using AI2_Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace AI2_Backend.Controllers
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("{employeeId}")]
        public ActionResult<UserProfileDto> GetUserProfile([FromRoute] int employeeId)
        {
            var userProfile = _employeeService.GetEmployeeProfile(employeeId);

            return Ok(userProfile);
        }

        [HttpGet("")]
        public ActionResult<IEnumerable<UserProfileDto>> GetAllEmployees([FromQuery] EmployeeQuery query)
        {
            var employees = _employeeService.GetAll(query);

            return Ok(employees);
        }
    }
}
