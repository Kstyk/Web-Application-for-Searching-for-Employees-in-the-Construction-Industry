using AI2_Backend.Models;
using AI2_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AI2_Backend.Controllers
{
    [Route("api/")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
    

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
         
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
    }
}
