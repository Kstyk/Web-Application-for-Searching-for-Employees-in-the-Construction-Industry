using AI2_Backend.Entities;
using FluentValidation;

namespace AI2_Backend.Models.Validators
{
    public class CreateExperienceDtoValidator : AbstractValidator<CreateExperienceDto>
    {
        public CreateExperienceDtoValidator(AIDbContext aIDbContext)
        {

            RuleFor(x => x.StartYear).NotEmpty().WithMessage("Rok rozpoczęcia pracy jest wymagany.")
                .GreaterThan(1900).LessThanOrEqualTo(2023).WithMessage("Rok rozpoczęcia pracy musi być z przedziału 1900-2023");
            RuleFor(x => x.EndYear).NotEmpty().WithMessage("Rok zakończenia pracy jest wymagany.")
                .GreaterThan(1900).LessThanOrEqualTo(2023).WithMessage("Rok rozpoczęcia pracy musi być z przedziału 1900-2023");
            RuleFor(x => x.Company).NotEmpty().WithMessage("Nazwa firmy jest wymagana.")
                                    .MaximumLength(255).WithMessage("Nazwa firmy nie może być dłuższa niż 255 znaków.");
        }
    }
}
