using AI2_Backend.Models;
using AI2_Backend.Models.DefaultValues;
using AI2_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.Filters;

namespace AI2_Backend.Controllers
{
    [Route("api/account")]
    [ApiController]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public class AccountController : ControllerBase
    {
        private IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [ProducesResponseType(typeof(UserProfileDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        [SwaggerOperation("Rejestracja nowego użytkownika.")]
        [SwaggerRequestExample(typeof(RegisterUserDto), typeof(RegisterUserDtoDefault))]
        [HttpPost("register")]
        public ActionResult ReqisterUser([FromBody] RegisterUserDto dto)
        {
            var entity = _accountService.RegisterUser(dto);

            return Created(nameof(entity), entity);
        }

        [SwaggerOperation("Logowanie do systemu.")]
        [SwaggerRequestExample(typeof(LoginUserDto), typeof(LoginUserDtoDefault))]
        [HttpPost("login")]
        public ActionResult LoginUser([FromBody] LoginUserDto dto)
        {
            try
            {
                string token = _accountService.GenerateJwt(dto);

                return Ok(token);
            } catch(Exception)
            {
                return Unauthorized("Niepoprawne dane logowawnia.");
            }
        }

        [SwaggerOperation("Edycja profilu.")]
        [SwaggerRequestExample(typeof(UpdateUserDto), typeof(UpdateUserDtoDefault))]
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
        [SwaggerOperation("Pobranie profilu zalogowanego użytkownika.")]
        [Authorize]
        public ActionResult<UserProfileDto> GetUserProfile()
        {
            var userProfile = _accountService.GetLoggedUserProfile();

            return Ok(userProfile);
        }

        [HttpDelete("delete")]
        [SwaggerOperation("Usunięcie konta.")]
        [Authorize]
        public ActionResult DeleteAccount()
        {
            _accountService.DeleteProfile();

            return Ok();
        }
    }
}
