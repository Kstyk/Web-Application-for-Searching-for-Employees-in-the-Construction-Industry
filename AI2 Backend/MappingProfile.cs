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

            CreateMap<User, UserProfileDto>();
        }
    }
}
