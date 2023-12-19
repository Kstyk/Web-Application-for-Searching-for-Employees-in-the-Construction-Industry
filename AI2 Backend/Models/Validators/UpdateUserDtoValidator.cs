using AI2_Backend.Entities;
using FluentValidation;

namespace AI2_Backend.Models.Validators
{
    public class UpdateUserDtoValidator : AbstractValidator<UpdateUserDto>
    {
        public UpdateUserDtoValidator(AIDbContext dbContext)
        {
            RuleFor(x => x.FirstName).NotEmpty().WithMessage("Imię jest wymagane.")
                                    .MaximumLength(255).WithMessage("Imię nie może być dłuższe niż 255 znaków.");
            RuleFor(x => x.LastName).NotEmpty().WithMessage("Nazwisko jest wymagane.")
                                    .MaximumLength(255).WithMessage("Nazwisko nie może być dłuższe niż 255 znaków.");
            RuleFor(x => x.AboutMe).MaximumLength(10000).WithMessage("Opis o sobie nie może być dłuższy niż 10 000 znaków.");
            RuleFor(x => x.Education).MaximumLength(10000).WithMessage("Opis wykształcenia nie może być dłuższy niż 10 000 znaków.");
            RuleFor(x => x.RequiredPayment).GreaterThan(0).WithMessage("Oczekiwana płaca musi być większa od zera.");
            RuleFor(x => x.Voivodeship).IsInEnum().WithMessage("Niepoprawne województwo");
            RuleForEach(x => x.UserExperiences)
            .SetValidator(new CreateExperienceDtoValidator(dbContext));
        }
    }
}
