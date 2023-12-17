using AI2_Backend.Entities;
using AI2_Backend.Enums;
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

            RuleFor(x => x.Password).NotEmpty().WithMessage("Hasło jest wymagane.");
            RuleFor(x => x.ConfirmPassword).NotEmpty().WithMessage("Powtórzenie hasła jest wymagane.");
            RuleFor(x => x.LastName).NotEmpty().WithMessage("Nazwisko jest wymagane.").MaximumLength(255).WithMessage("Podane nazwisko jest za długie");
            RuleFor(x => x.FirstName).NotEmpty().WithMessage("Imię jest wymagane").MaximumLength(255).WithMessage("Podane imię jest za długie.");
        }   

    }
}
