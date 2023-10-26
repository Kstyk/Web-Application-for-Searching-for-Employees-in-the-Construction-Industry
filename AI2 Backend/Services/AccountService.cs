using AI2_Backend.Entities;
using AI2_Backend.Models;
using AI2_Backend.Settings;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace AI2_Backend.Services
{
    public class AccountService : IAccountService
    {
        private AIDbContext _context;
        private IPasswordHasher<User> _passwordHasher;
        private AuthenticationSettings _settings;
        private readonly IMapper _mapper;
        private IUserContextService _userContextService;

        public AccountService(AIDbContext context, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings, IMapper mapper, IUserContextService userContext)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _settings = authenticationSettings;
            _mapper = mapper;
            _userContextService = userContext;
        }

        public void RegisterUser(RegisterUserDto dto)
        {
            var newUser = _mapper.Map<User>(dto);
            var hashedPassword = _passwordHasher.HashPassword(newUser, dto.Password);
            newUser.Password = hashedPassword;
            _context.Users.Add(newUser);
            _context.SaveChanges();
        }
    }
}
