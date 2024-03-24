﻿using AI2_Backend.Models;
using AI2_Backend.Models.DefaultValues;
using AI2_Backend.Models.Queries;
using AI2_Backend.Services;
using Microsoft.AspNetCore.Authorization;
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

        [ProducesResponseType(typeof(LoggedUserProfileResponse), StatusCodes.Status200OK)]
        [SwaggerResponseExample(StatusCodes.Status200OK, typeof(LoggedUserProfileResponse))]
        [SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(EmployeeNotFoundResponse))]
        [ProducesResponseType(typeof(EmployeeNotFoundResponse), StatusCodes.Status404NotFound)]
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

        [ProducesResponseType(typeof(ListOfEmployeesResponse), StatusCodes.Status200OK)]
        [SwaggerResponseExample(StatusCodes.Status200OK, typeof(ListOfEmployeesResponse))]
        [SwaggerOperation("Wyszukaj pracowników.")]
        [HttpGet("")]
        public ActionResult<IEnumerable<UserProfileDto>> GetAllEmployees([FromQuery] EmployeeQuery query)
        {
            var employees = _employeeService.GetAll(query);

            return Ok(employees);
        }

        [HttpPost("{employeeId}")]
        [Authorize(Policy = "IsRecruiter")]
        [SwaggerOperation(Summary = "Zapisz profil", Description = "Zapisuje profil pracownika.")]
        [SwaggerResponse(200, "Profil zapisano pomyślnie")]
        [SwaggerResponse(204, "Profil już istnieje")]
        [SwaggerResponse(403, "Nie jesteś rekruterem")]
        [SwaggerResponse(404, "Nie istnieje profil o takim ID")]
        public ActionResult SaveProfile([FromRoute] int employeeId)
        {
            try
            {
                var isSavedProfile = _employeeService.SaveProfile(employeeId);
                if (!isSavedProfile)
                {
                    return NotFound();
                }
            } catch(Exception)
            {
                return NoContent();
            }

            return Ok(new { Message = "Zapisałeś profil"});
        }

        [HttpDelete("{savedProfileId}")]
        [Authorize(Policy = "IsRecruiter")]
        [SwaggerOperation(Summary = "Usuń zapisany profil")]
        [SwaggerResponse(204, "Profil usunięto pomyślnie")]
        [SwaggerResponse(401, "Brak uwierzytelnienia")]
        [SwaggerResponse(403, "Nie jesteś rekruterem")]
        [SwaggerResponse(404, "Nie znaleziono profilu")]
        public ActionResult DeleteSavedProfile([FromRoute] int savedProfileId)
        {
           
            var isDeleted = _employeeService.DeleteSavedProfile(savedProfileId);
          
            if (!isDeleted)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpGet("saved-profiles")]
        [Authorize(Policy = "IsRecruiter")]
        [SwaggerOperation(Summary = "Pobierz zapisane profile")]
        [SwaggerResponse(200, "Pomyślnie pobrano zapisane profile", typeof(List<SaveProfileDto>))]
        [SwaggerResponse(403, "Nie jesteś rekruterem", typeof(void))]
        public ActionResult<List<SaveProfileDto>> GetSavedProfiles()
        {
            var savedProfiles = _employeeService.GetSavedProfiles();

            return Ok(savedProfiles);
        }
    }
}
