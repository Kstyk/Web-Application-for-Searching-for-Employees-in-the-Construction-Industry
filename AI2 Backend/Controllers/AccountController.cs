using AI2_Backend.Entities;
using AI2_Backend.Models;
using AI2_Backend.Models.DefaultValues;
using AI2_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.Filters;
using System.Net;
using static AI2_Backend.Models.DefaultValues.ValidationUserErrorResponse;

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

        [ProducesResponseType(typeof(RegisterUserCreatedResponse), StatusCodes.Status201Created)]
        [SwaggerResponseExample(StatusCodes.Status201Created, typeof(RegisterUserCreatedResponse))]
        [ProducesResponseType(typeof(ValidationExampleTemplate), StatusCodes.Status400BadRequest)]
        [SwaggerRequestExample(typeof(RegisterUserDto), typeof(RegisterUserDtoDefault))]
        [SwaggerOperation("Rejestracja nowego użytkownika.")]
        [HttpPost("register")]
        public ActionResult ReqisterUser([FromBody] RegisterUserDto dto)
        {
            var entity = _accountService.RegisterUser(dto);

            return Created(nameof(entity), entity);
        }

        [ProducesResponseType(typeof(LoginUserUnsuccesfulResponse), StatusCodes.Status401Unauthorized)]
        [SwaggerResponseExample(StatusCodes.Status401Unauthorized, typeof(LoginUserUnsuccesfulResponse))]
        [ProducesResponseType(typeof(LoginUserSuccesfulResponse), StatusCodes.Status200OK)]
        [SwaggerResponseExample(StatusCodes.Status200OK, typeof(LoginUserSuccesfulResponse))]
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

        [ProducesResponseType(typeof(UserUnauthorizedResponse),StatusCodes.Status401Unauthorized)]
        [SwaggerResponseExample(StatusCodes.Status401Unauthorized, typeof(UserUnauthorizedResponse))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [SwaggerResponseExample(StatusCodes.Status400BadRequest, typeof(ValidationUserEditErrorResponse))]
        [ProducesResponseType(typeof(ValidationUserEditErrorResponse),StatusCodes.Status400BadRequest)]
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

        [ProducesResponseType(typeof(UserUnauthorizedResponse), StatusCodes.Status401Unauthorized)]
        [SwaggerResponseExample(StatusCodes.Status401Unauthorized, typeof(UserUnauthorizedResponse))]
        [ProducesResponseType(typeof(LoggedUserProfileResponse),StatusCodes.Status200OK)]
        [SwaggerResponseExample(StatusCodes.Status200OK, typeof(LoggedUserProfileResponse))]
        [HttpGet("my-profile")]
        [SwaggerOperation("Pobranie profilu zalogowanego użytkownika.")]
        [Authorize]
        public ActionResult<MyProfileDto> GetUserProfile()
        {
            var userProfile = _accountService.GetLoggedUserProfile();

            return Ok(userProfile);
        }

        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(UserUnauthorizedResponse), StatusCodes.Status401Unauthorized)]
        [SwaggerResponseExample(StatusCodes.Status401Unauthorized, typeof(UserUnauthorizedResponse))]
        [HttpDelete("delete")]
        [SwaggerOperation("Usunięcie konta.")]
        [Authorize]
        public ActionResult DeleteAccount()
        {
            _accountService.DeleteProfile();

            return NoContent();
        }


       
    }
}
