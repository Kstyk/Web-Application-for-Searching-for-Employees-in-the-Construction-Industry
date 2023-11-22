using AI2_Backend.Entities;
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
                .ForMember(dest => dest.UserQualifications, opt => opt.Ignore());

            CreateMap<Qualification, QualificationDto>();
            CreateMap<UserQualification, QualificationDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.QualificationId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Qualification.Name));

            CreateMap<Experience, ExperienceDto>();
            CreateMap<UserExperience, ExperienceDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ExperienceId))
                .ForMember(dest => dest.StartYear, opt => opt.MapFrom(src => src.Experience.StartYear))
                .ForMember(dest => dest.EndYear, opt => opt.MapFrom(src => src.Experience.EndYear))
                .ForMember(dest => dest.Company, opt => opt.MapFrom(src => src.Experience.Company))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Experience.Description));

            CreateMap<User, MyProfileDto>();
            CreateMap<User, UserProfileDto>()
                .ForMember(dest => dest.Voivodeship, opt => opt.Condition(src => src?.UserPreferences?.IsVisibleVoivodeship == true))
                .ForMember(dest => dest.AboutMe, opt => opt.Condition(src => src?.UserPreferences?.IsVisibleAboutMe == true))
                .ForMember(dest => dest.Education, opt => opt.Condition(src => src?.UserPreferences?.IsVisibleEducation == true))
                .ForMember(dest => dest.RequiredPayment, opt => opt.Condition(src => src?.UserPreferences?.IsVisibleRequiredPayment == true))
                .ForMember(dest => dest.UserExperiences, opt => opt.Condition(src => src?.UserPreferences?.IsVisibleExperience == true))
                .ForMember(dest => dest.UserQualifications, opt => opt.Condition(src => src?.UserPreferences?.IsVisibleSkills == true));


        }
    }
}
