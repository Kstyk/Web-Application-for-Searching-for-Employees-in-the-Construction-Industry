using AI2_Backend.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace AI2_Backend.Models.Validators
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserDtoValidator(AIDbContext dbContext)
        {
            RuleFor(x => x.ConfirmPassword).Equal(e => e.Password);
            RuleFor(x => x.Email)
                    .NotEmpty().WithMessage("Email jest wymagany.")
                    .EmailAddress().WithMessage("Niepoprawny format adresu e-mail.");

            RuleFor(x => x.Email)
                .Custom((value, context) =>
                {
                    bool emailInUse = dbContext.Users.Any(u => u.Email == value);

                    if (emailInUse)
                    {
                        context.AddFailure("Email", "Ten email istnieje w naszej bazie.");
                    }                                       
                });
        }

    }
}
