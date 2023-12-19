using AI2_Backend.Entities;
using AI2_Backend.Enums;
using AI2_Backend.Models;
using AI2_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        [Authorize]
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
        [Authorize]
        public ActionResult<List<InvitationHistory>> GetInvitations([FromRoute] int recruiterId)
        {
            var currentUserId = _userContextService.GetUserId;
            if (currentUserId != recruiterId)
            {
                return Unauthorized("Brak autoryzacji"); 
            }

            var invitations = _emailService.GetInvitations(recruiterId);
      
            return Ok(invitations);
        }

        [HttpPut("invitations/{invitationId}")]
        [Authorize]
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

    }
}
