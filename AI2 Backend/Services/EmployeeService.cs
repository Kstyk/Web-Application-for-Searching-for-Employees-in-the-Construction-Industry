using AI2_Backend.Entities;
using AI2_Backend.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AI2_Backend.Services
{
    public class EmployeeService : IEmployeeService
    {
        private AIDbContext _context;
        private readonly IMapper _mapper;

        public EmployeeService(AIDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public UserProfileDto GetEmployeeProfile(int employeeId)
        {
            var userProfile = _mapper.Map<UserProfileDto>(_context.Users
                .Include(q => q.UserQualifications).ThenInclude(u => u.Qualification)
                .FirstOrDefault(u => u.Id == employeeId));

            return userProfile;
        }
    }
}
