using AI2_Backend.Entities;
using AI2_Backend.Models;
using AI2_Backend.Settings;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace AI2_Backend.Services
{
    public class QualificationService : IQualificationService
    {
        private AIDbContext _context;
        private readonly IMapper _mapper;

        public QualificationService(AIDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public List<QualificationDto> GetAllQualifications()
        {
            var qualifications = _mapper.Map<List<QualificationDto>>(_context.Qualifications);

            return qualifications;
        }
    }
}
