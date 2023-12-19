using AI2_Backend.Entities;
using AI2_Backend.Enums;
using AI2_Backend.Models;
using AI2_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;

namespace AI2_Backend.Controllers
{
    [Route("api/")]
    public class InvitationController : ControllerBase
    {
        private readonly IInvitationSevice _emailService;
        private readonly IUserContextService _userContextService;
    

        public InvitationController(IInvitationSevice emailService, IUserContextService userContextService)
        {
            _emailService = emailService;
            _userContextService = userContextService;
        }

        [HttpPost("invitation")]
        [Authorize(Policy = "IsRecruiter")]
        [SwaggerOperation(Summary = "Wysyłanie zaproszenia mailem")]
        [SwaggerResponse(200, "Zaproszenie wysłane pomyślnie", typeof(void))]
        [SwaggerResponse(400, "Wprowadzono niepoprawne dane", typeof(string))]
        [SwaggerResponse(403, "Nie jesteś rekruterem", typeof(string))]
        [SwaggerResponse(500, "Wystąpił błąd podczas wysyłania zaproszenia", typeof(string))]
        public ActionResult SendInvitation([FromForm] InvitationRequestDto inv)
        {
            if (inv == null || string.IsNullOrEmpty(inv.ToEmail) || string.IsNullOrEmpty(inv.Subject) || string.IsNullOrEmpty(inv.Body))
            {
                return BadRequest("Wprowadzono niepoprawne dane. Prosze wprowadzić poprawne dane.");
            }
          
            try
            {
                _emailService.SendMail(inv);

                return Ok(new { Message = "Zaproszenie wysłane pomyślnie" });

            } 
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
          
           
        }

        [HttpGet("invitations/{recruiterId}")]
        [Authorize(Policy = "IsRecruiter")]
        [SwaggerOperation(Summary = "Lista zaproszeń rekrutera")]
        [SwaggerResponse(200, "Pomyślnie pobrano zaproszenia", typeof(List<InvitationHistory>))]
        [SwaggerResponse(403, "Nie jesteś rekruterem", typeof(string))]
        public ActionResult<List<InvitationHistory>> GetInvitations([FromRoute] int recruiterId)
        {
            var currentUserId = _userContextService.GetUserId;
            if (currentUserId != recruiterId)
            {
                return Forbid("Brak autoryzacji"); 
            }

            var invitations = _emailService.GetInvitations(recruiterId);
      
            return Ok(invitations);
        }

        [HttpPut("invitations/{invitationId}")]
        [Authorize]
        [SwaggerOperation(Summary ="Aktualizacja statusu zaproszenia")]
        [SwaggerResponse(200, "Pomyślnie zaktualizowano status zaproszenia")]
        [SwaggerResponse(400, "Nieprawidłowa wartość 'Status'", typeof(InvitationStatus))]
        [SwaggerResponse(404, "Nie znaleziono zaproszenia")]
        public ActionResult UpdateInvitationStatus([FromRoute] int invitationId, [FromBody] UpdateInvitationStatusDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!Enum.IsDefined(typeof(InvitationStatus), updateDto.Status))
            {
                ModelState.AddModelError(nameof(updateDto.Status), "Nieprawidłowa wartość 'Status'");
                return BadRequest(ModelState);
            }

            var isUpdatedInvitation = _emailService.Update(invitationId, updateDto);

            if (!isUpdatedInvitation)
            {
                return NotFound();
            }

            return Ok(new { Message = "Pomyślnie zaktualizowano status zaproszenia" });


        }

        [HttpGet("invitations/employee/{employeeId}")]
        [SwaggerOperation(Summary = "Lista zaproszeń pracownika")]
        [SwaggerResponse(200, "Pomyślnie pobrano zaproszenia pracownika")]
        [SwaggerResponse(400, "Nieprawidłowa wartość 'status'", typeof(string))]
        [SwaggerResponse(404, "Nie znaleziono zaproszeń pracownika")]
        public ActionResult<List<InvitationEmployeeDto>> GetEmployeeInvitations(int employeeId, [FromQuery] InvitationStatus status = InvitationStatus.NEW)
        {
            if (!Enum.IsDefined(typeof(InvitationStatus), status))
            {
                return BadRequest("Nieprawidłowa wartość 'status'");
            }

            var invitationsDto = _emailService.GetEmployeeInvitations(employeeId, status);

            if (invitationsDto == null)
            {
                return NotFound();
            }

            return Ok(invitationsDto);
        }

    }
}
