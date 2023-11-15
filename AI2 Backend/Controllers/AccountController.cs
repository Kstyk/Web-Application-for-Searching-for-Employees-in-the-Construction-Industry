using AI2_Backend.Models;
using AI2_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AI2_Backend.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        public ActionResult ReqisterUser([FromBody] RegisterUserDto dto)
        {
            _accountService.RegisterUser(dto);

            return Ok();
        }

        [HttpPost("login")]
        public ActionResult LoginUser([FromBody] LoginUserDto dto)
        {
            try
            {
                string token = _accountService.GenerateJwt(dto);

                return Ok(token);
            } catch(Exception ex)
            {
                return Unauthorized("Niepoprawne dane logowawnia.");
            }
        }

        [HttpPut("update")]
        [Authorize]
        public ActionResult UpdateUser([FromBody] UpdateUserDto dto) {
            try
            {
                _accountService.UpdateUser(dto);

                return Ok();
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("my-profile")]
        [Authorize]
        public ActionResult<UserProfileDto> GetUserProfile()
        {
            var userProfile = _accountService.GetLoggedUserProfile();

            return Ok(userProfile);
        }

        [HttpDelete("delete")]
        [Authorize]
        public ActionResult DeleteAccount()
        {
            _accountService.DeleteProfile();

            return Ok();
        }
    }
}
