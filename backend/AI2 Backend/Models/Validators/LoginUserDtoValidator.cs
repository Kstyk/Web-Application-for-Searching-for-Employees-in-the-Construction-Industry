using AI2_Backend.Entities;
using FluentValidation;

namespace AI2_Backend.Models.Validators
{
    public class LoginUserDtoValidator : AbstractValidator<LoginUserDto>
    {
        public LoginUserDtoValidator(AIDbContext context)
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email jest wymagany.");
            RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("Hasło jest wymagane.");
        }
    }
}
