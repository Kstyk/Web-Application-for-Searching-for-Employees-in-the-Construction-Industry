using AI2_Backend.Entities;
using AI2_Backend.Models;
using AI2_Backend.Settings;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

        public UserProfileDto RegisterUser(RegisterUserDto dto)
        {
            var newUser = _mapper.Map<User>(dto);
            var hashedPassword = _passwordHasher.HashPassword(newUser, dto.Password);
            newUser.Password = hashedPassword;
            _context.Users.Add(newUser);

            var role = _context.Roles.FirstOrDefault(q => q.Id == dto.RoleId);

            if (role.Name.Equals("employee")) {
                var userPrefs = new UserPreferences
                {
                    Employee = newUser
                };

                _context.UserPreferences.Add(userPrefs);

                var userStats = new Stats
                {
                    Employee = newUser
                };

                _context.Stats.Add(userStats);
            }

            _context.SaveChanges();


            return _mapper.Map<UserProfileDto>(newUser);
        }

        public string GenerateJwt(LoginUserDto loginUserDto)
        {
            var user = _context.Users
                .FirstOrDefault(x => x.Email == loginUserDto.Email);

            if (user is null)
            {
                throw new Exception();
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, loginUserDto.Password);

            if (result == PasswordVerificationResult.Failed)
            {
                throw new Exception();
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim("Id", $"{user.Id}"),
                new Claim("Email", $"{user.Email}"),
                new Claim("FirstName", $"{user.FirstName}"),
                new Claim("LastName", $"{user.LastName}"),

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.JwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_settings.JwtExpireDays);

            var token = new JwtSecurityToken(_settings.JwtIssuer, _settings.JwtIssuer, claims, expires: expires,
                signingCredentials: credentials);

            var tokenHandler = new JwtSecurityTokenHandler();


            return tokenHandler.WriteToken(token);
        }

        public void UpdateUser(UpdateUserDto updateUserDto)
        {
            var userId = _userContextService.GetUserId;
            var user = _context.Users.Include(u => u.UserExperiences).Include(u => u.Role).Include(u=> u.UserPreferences).FirstOrDefault(u => u.Id == userId);

            if (user is null)
            {
                throw new Exception();
            }

            if (updateUserDto.UserPreferences != null && user.Role.Name.Equals("employee"))
            {
                var preferences = _mapper.Map<UpdateUserPreferencesDto, UserPreferences>(updateUserDto.UserPreferences, user.UserPreferences);
                _context.UserPreferences.Update(preferences);
            } else
            {
                updateUserDto.UserPreferences = null;
            }

            if (updateUserDto.QualificationsToAdd != null && user.Role.Name.Equals("employee"))
            {
                _context.UserQualifications.Where(q => q.UserId == user.Id).ExecuteDelete();

                var qualificationsToAdd = _context.Qualifications
                    .Where(q => updateUserDto.QualificationsToAdd.Contains(q.Id))
                    .ToList();

                foreach (var qualification in qualificationsToAdd)
                {
                    user.UserQualifications.Add(new UserQualification { UserId = user.Id, QualificationId = qualification.Id });
                }
            }

            if (updateUserDto.UserExperiences != null && user.Role.Name.Equals("employee"))
            {
                if (user.UserExperiences.Any())
                {
                    foreach (var experience in user.UserExperiences)
                    {
                        _context.Experiences.Where(e => e.Id == experience.ExperienceId).ExecuteDelete();
                    }
                } 

                foreach (var experienceDto in updateUserDto.UserExperiences)
                {
                    var experience = _mapper.Map<CreateExperienceDto, Experience>(experienceDto);
                    var userExperience = new UserExperience { EmployeeId = user.Id, Experience = experience };
                    user.UserExperiences.Add(userExperience);
                }
            }

            var updateUser = _mapper.Map<UpdateUserDto, User>(updateUserDto, user);

            _context.Users.Update(updateUser);
            _context.SaveChanges();
        }

        public MyProfileDto GetLoggedUserProfile()
        {
            var userId = _userContextService.GetUserId;

            var userProfile = _mapper.Map<MyProfileDto>(_context.Users
                .Include(q => q.UserQualifications).ThenInclude(u => u.Qualification)
                .Include(q => q.UserExperiences).ThenInclude(u => u.Experience)
                .Include(q => q.UserPreferences)
                .FirstOrDefault(u => u.Id == userId));

            var stats = _context.Stats
                .FirstOrDefault(u => u.Id == userId);
            if (stats != null)
            {
                userProfile.CounterDaily = stats.CounterDaily;
                userProfile.CounterMonthy = stats.CounterMonthly;
                stats.CounterDaily++;
                stats.CounterMonthly++;
                _context.Stats.Update(stats);
                _context.SaveChanges();

            }
            else
            {
                stats = new Stats();
                stats.CounterMonthly = 0;
                stats.CounterDaily = 0;
                stats.EmployeeId = (int)userId;
                _context.Stats.Add(stats);
                _context.SaveChanges();

            }

            return userProfile;
        }

        public void DeleteProfile()
        {
            var userId = _userContextService.GetUserId;

            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            if(user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

     
    }
}
