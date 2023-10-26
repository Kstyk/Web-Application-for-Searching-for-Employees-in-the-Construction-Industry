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
        }
    }
}
