using AI2_Backend.Entities;
using AI2_Backend.Enums;
using AI2_Backend.Models;
using AutoMapper;

namespace AI2_Backend
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterUserDto, User>();
            CreateMap<UpdateUserDto, User>()
                .ForMember(dest => dest.UserQualifications, opt => opt.Ignore())
                .ForMember(dest => dest.UserExperiences, opt => opt.Ignore());

            CreateMap<Qualification, QualificationDto>();
            CreateMap<UserQualification, QualificationDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.QualificationId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Qualification.Name));

            CreateMap<UserExperience, ExperienceDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ExperienceId))
                .ForMember(dest => dest.StartYear, opt => opt.MapFrom(src => src.Experience.StartYear))
                .ForMember(dest => dest.EndYear, opt => opt.MapFrom(src => src.Experience.EndYear))
                .ForMember(dest => dest.Company, opt => opt.MapFrom(src => src.Experience.Company))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Experience.Description));


            CreateMap<Experience, ExperienceDto>();
            CreateMap<UserExperience, ExperienceDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ExperienceId))
                .ForMember(dest => dest.StartYear, opt => opt.MapFrom(src => src.Experience.StartYear))
                .ForMember(dest => dest.EndYear, opt => opt.MapFrom(src => src.Experience.EndYear))
                .ForMember(dest => dest.Company, opt => opt.MapFrom(src => src.Experience.Company))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Experience.Description));
            CreateMap<CreateExperienceDto, Experience>();

            CreateMap<User, MyProfileDto>()
                 .ForMember(dest => dest.CounterDaily, opt => opt.MapFrom(src => src.Stats.CounterDaily))
                .ForMember(dest => dest.CounterMonthly, opt => opt.MapFrom(src => src.Stats.CounterMonthly));
            CreateMap<UserPreferences, UserPreferencesDto>();
            CreateMap<User, UserProfileDto>()
                .ForMember(dest => dest.Voivodeship, opt => opt.Condition(src => src?.UserPreferences?.IsVisibleVoivodeship == true))
                .ForMember(dest => dest.AboutMe, opt => opt.Condition(src => src?.UserPreferences?.IsVisibleAboutMe == true))
                .ForMember(dest => dest.Education, opt => opt.Condition(src => src?.UserPreferences?.IsVisibleEducation == true))
                .ForMember(dest => dest.RequiredPayment, opt => opt.Condition(src => src?.UserPreferences?.IsVisibleRequiredPayment == true))
                .ForMember(dest => dest.UserExperiences, opt => opt.Condition(src => src?.UserPreferences?.IsVisibleExperience == true))
                .ForMember(dest => dest.UserQualifications, opt => opt.Condition(src => src?.UserPreferences?.IsVisibleSkills == true))
                .ForMember(dest => dest.CounterDaily, opt => opt.MapFrom(src => src.Stats.CounterDaily))
                .ForMember(dest => dest.CounterMonthly, opt => opt.MapFrom(src => src.Stats.CounterMonthly));

            CreateMap<InvitationRequestDto, InvitationHistory>()
                .ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Body))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Subject));
               
           
            CreateMap<InvitationHistory, InvitationDto>()
                .ForMember(dest => dest.EmployeeId, opt => opt.MapFrom(src => src.Employee.Id))
                .ForMember(dest => dest.EmployeeEmail, opt => opt.MapFrom(src => src.Employee.Email))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.DateOfSending.ToString("dd.MM.yyyy HH:mm")))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status));

            CreateMap<InvitationHistory, InvitationEmployeeDto>()
              .ForMember(dest => dest.EmployeeId, opt => opt.MapFrom(src => src.Employee.Id))
              .ForMember(dest => dest.RecruiterEmail, opt => opt.MapFrom(src => src.Recruiter.Email))
              .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.DateOfSending.ToString("dd.MM.yyyy HH:mm")))
              .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status));


            CreateMap<UpdateInvitationStatusDto, InvitationHistory>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status));

            CreateMap<SavedProfile, SaveProfileDto>()
                 .ForMember(dest => dest.EmployeeEmail, opt => opt.MapFrom(src => src.Employee.Email))
                 .ForMember(dest => dest.EmployeeFirstName, opt => opt.MapFrom(src => src.Employee.FirstName))
                 .ForMember(dest => dest.EmployeeLastName, opt => opt.MapFrom(src => src.Employee.LastName))
                  .ForMember(dest => dest.ProfileId, opt => opt.MapFrom(src => src.Employee.Id))
                 .ForMember(dest => dest.Qualifications, opt => opt.MapFrom(src => src.Employee.UserQualifications));

       
            CreateMap<UpdateUserPreferencesDto, UserPreferences>();


        }
     
    }
}
