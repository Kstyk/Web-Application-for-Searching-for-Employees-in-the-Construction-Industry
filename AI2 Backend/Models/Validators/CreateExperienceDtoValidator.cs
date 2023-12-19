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
            RuleFor(x => x.Description)
                                    .MaximumLength(10000).WithMessage("Opis pracy nie może być dłuższy niż 10000 znaków.");

            RuleFor(x => x.StartYear)
            .LessThanOrEqualTo(x => x.EndYear).WithMessage("Rok rozpoczęcia pracy nie może być większy niż rok zakończenia pracy.");
            RuleFor(x => x.EndYear)
            .GreaterThanOrEqualTo(x => x.StartYear).WithMessage("Rok zakończenia pracy nie może być mniejszy niż rok rozpoczęcia pracy.");
        }
    }
}
