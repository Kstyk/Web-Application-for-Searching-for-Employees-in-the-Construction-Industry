using AI2_Backend.Models;
using AI2_Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace AI2_Backend.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("profile/{employeeId}")]
        public ActionResult<UserProfileDto> GetUserProfile([FromRoute] int employeeId)
        {
            var userProfile = _employeeService.GetEmployeeProfile(employeeId);

            return Ok(userProfile);
        }
    }
}
