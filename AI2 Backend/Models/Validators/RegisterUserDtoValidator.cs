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

            RuleFor(x => x.Password).NotEmpty().WithMessage("Hasło jest wymagane.");
            RuleFor(x => x.ConfirmPassword).NotEmpty().WithMessage("Powtórzenie hasła jest wymagane.");
            RuleFor(x => x.FirstName).NotEmpty().WithMessage("Imię jest wymagane.")
                                    .MaximumLength(255).WithMessage("Imię nie może być dłuższe niż 255 znaków.");
            RuleFor(x => x.LastName).NotEmpty().WithMessage("Nazwisko jest wymagane.")
                                    .MaximumLength(255).WithMessage("Nazwisko nie może być dłuższe niż 255 znaków.");
            RuleFor(x => x.AboutMe).MaximumLength(10000).WithMessage("Opis o sobie nie może być dłuższy niż 10 000 znaków.");
            RuleFor(x => x.Education).MaximumLength(10000).WithMessage("Opis wykształcenia nie może być dłuższy niż 10 000 znaków.");
            RuleFor(x => x.RequiredPayment).GreaterThan(0).WithMessage("Oczekiwana płaca musi być większa od zera.");
        }   

    }
}
