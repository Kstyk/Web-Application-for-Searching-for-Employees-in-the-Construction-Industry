using AI2_Backend.Entities;
using AI2_Backend.Enums;
using AI2_Backend.Models;
using AI2_Backend.Models.Queries;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;

namespace AI2_Backend.Services
{
    public class EmployeeService : IEmployeeService
    {
        private AIDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContextService;

        public EmployeeService(AIDbContext context, IMapper mapper, IUserContextService userContextService)
        {
            _context = context;
            _mapper = mapper;
            _userContextService = userContextService;
        }
        public void ResetDailyCounters()
        {
            var today = DateTime.Today;

            var statsList = _context.Stats
                .Where(s => s.CounterDaily > 0 && s.LastDailyReset.Date < today)
                .ToList();

            foreach (var stats in statsList)
            {
                if (stats.Employee?.UserPreferences?.IsVisibleProfile != false)
                {
                    stats.CounterDaily = 1;
                    stats.LastDailyReset = today;
                    _context.Stats.Update(stats);
                }
            }

            _context.SaveChanges();
        }

        public void ResetMonthlyCounters()
        {
            var today = DateTime.Today;

            var statsList = _context.Stats
                .Where(s => s.CounterMonthly > 0 && s.LastMonthlyReset.Month != today.Month)
                .ToList();

            foreach (var stats in statsList)
            {
                if (stats.Employee?.UserPreferences?.IsVisibleProfile != false)
                {
                    stats.CounterMonthly = 1;
                    stats.LastMonthlyReset = today;
                    _context.Stats.Update(stats);
                }
            }

            _context.SaveChanges();
        }



        public UserProfileDto GetEmployeeProfile(int employeeId)
        {

            var user = _context.Users
                .Include(q => q.UserQualifications).ThenInclude(u => u.Qualification)
                .Include(q => q.UserExperiences).ThenInclude(u => u.Experience)
                .Include(q => q.UserPreferences)
                .Include(q => q.Stats)
                .FirstOrDefault(u => u.Id == employeeId);

            if (user != null)
            {
                if (user?.UserPreferences?.IsVisibleProfile == false)
                {
                    return null;
                }


                var stats = _context.Stats
                    .FirstOrDefault(u => u.EmployeeId == employeeId);
               

                ResetDailyCounters();
                ResetMonthlyCounters();

                var userProfile = _mapper.Map<UserProfileDto>(user);

                if (stats != null)   // Statystyka
                {
                    if (stats.LastUpdateDate.Date == DateTime.Now.Date)
                    {
                        userProfile.CounterDaily = stats.CounterDaily;
                    }
                    else
                    {
                        userProfile.CounterDaily = 0;
                    }
                    if (stats.LastUpdateDate.Year == DateTime.Now.Year
                        && stats.LastUpdateDate.Month == DateTime.Now.Month)
                    {
                        userProfile.CounterMonthly = stats.CounterMonthly;
                    }
                    else
                    {
                        userProfile.CounterMonthly = 0;
                    }
                    userProfile.CounterAll = stats.CounterAll;
                }

                return userProfile;
            }
            else return null;
        }

        public PagedResult<UserProfileDto> GetAll(EmployeeQuery query)
        {
            // wszyscy users z rolą pracownika
            var baseQuery = _context
                .Users
                .Include(q => q.UserQualifications).ThenInclude(u => u.Qualification)
                .Include(q => q.UserExperiences).ThenInclude(u => u.Experience)
                .Include(q => q.UserPreferences)
                .Include(q => q.Stats)
                .Where(r => r.Role.Name == "employee" && r.UserPreferences.IsVisibleProfile == true);

            // filtrowanie
            if (query.MinimumPayment is not null)
            {
                baseQuery = baseQuery
                    .Where(r => r.RequiredPayment >= query.MinimumPayment && r.UserPreferences.IsVisibleRequiredPayment == true && r.UserPreferences.IsVisibleProfile == true);
            }
            if (query.MaximumPayment is not null)
            {
                baseQuery = baseQuery
                    .Where(r => r.RequiredPayment <= query.MaximumPayment && r.UserPreferences.IsVisibleRequiredPayment == true && r.UserPreferences.IsVisibleProfile == true);
            }

            if (query.QualificationId is not null)
            {
                baseQuery = baseQuery
                    .Where(r => r.UserQualifications.Any(uq => uq.QualificationId == query.QualificationId && r.UserPreferences.IsVisibleProfile == true && r.UserPreferences.IsVisibleSkills == true));
            }

            if (query.Voivodeship is not null)
            {
                baseQuery = baseQuery
                    .Where(r => r.Voivodeship == query.Voivodeship && r.UserPreferences.IsVisibleVoivodeship == true && r.UserPreferences.IsVisibleProfile == true);
            }

            if (query.SearchText is not null)
            {
                baseQuery = baseQuery
                    .Where(r => (r.FirstName.Contains(query.SearchText) || r.LastName.Contains(query.SearchText)) || r.Email.Contains(query.SearchText) && r.UserPreferences.IsVisibleProfile == true && r.UserPreferences.IsVisibleVoivodeship == true);
            }


            // sortowanie
            var columnsSelectors = new Dictionary<string, Expression<Func<User, object>>> {
                    { nameof(User.RequiredPayment), r => r.RequiredPayment },
                    { nameof(User.FirstName), r => r.FirstName },
                    { nameof(User.LastName), r => r.LastName },
                    { nameof(User.Email), r => r.Email },
                    { nameof(User.Voivodeship), r => r.Voivodeship.Value },
                };

            var selectedColumn = columnsSelectors[query.SortBy];
            if (query.SortBy == nameof(User.Voivodeship))
            {
                baseQuery = query.SortDirection == SortDirection.ASC ?
                   baseQuery.Where(r => r.UserPreferences.IsVisibleVoivodeship).OrderBy(selectedColumn) :
                   baseQuery.Where(r => r.UserPreferences.IsVisibleVoivodeship).OrderByDescending(selectedColumn);
            }
            else if (query.SortBy == nameof(User.RequiredPayment))
            {
                baseQuery = query.SortDirection == SortDirection.ASC ?
                   baseQuery.Where(r => r.UserPreferences.IsVisibleRequiredPayment).OrderBy(selectedColumn) :
                   baseQuery.Where(r => r.UserPreferences.IsVisibleRequiredPayment).OrderByDescending(selectedColumn);
            }
            else
            {
                // Normalne sortowanie dla innych kolumn
                baseQuery = query.SortDirection == SortDirection.ASC ?
                    baseQuery.OrderBy(selectedColumn) :
                    baseQuery.OrderByDescending(selectedColumn);
            }

            // paginacja
            var employees = baseQuery
                .Skip(query.PageSize * (query.PageNumber - 1))
                .Take(query.PageSize)
                .ToList();

            var employeesDto = _mapper.Map<List<UserProfileDto>>(employees);

            var result = new PagedResult<UserProfileDto>(employeesDto, baseQuery.Count(), query.PageSize, query.PageNumber);

            return result;
        }

        public bool SaveProfile(int employeeId)
        {
            var myId = _userContextService.GetUserId;

            var exists = _context.Users.Any(e => e.Id == employeeId && e.Role.Name.Equals("employee"));

            if (_context.SavedProfiles.Any(e => e.EmployeeId == employeeId && e.RecruiterId == myId))
            {
                throw new Exception();
            }

            if (!exists || myId is null)
            {
                return false;
            }

            var savedProfile = new SavedProfile
            {
                EmployeeId = employeeId,
                RecruiterId = (int)myId,
            };
            _context.SavedProfiles.Add(savedProfile);
            _context.SaveChanges();

            return true;

        }
        public bool DeleteSavedProfile(int savedProfileId)
        {
            var myId = _userContextService.GetUserId;

            var exists = _context.SavedProfiles.FirstOrDefault(e => e.Id == savedProfileId);

            if (exists is null || myId is null) { return false; }

            _context.SavedProfiles.Remove(exists); 
            _context.SaveChanges();

            return true;
        }

        public List<SaveProfileDto> GetSavedProfiles()
        {
            var myId = _userContextService.GetUserId;

            if (myId is null)
            {
                return new List<SaveProfileDto>();
            }

            var savedProfiles = _context.SavedProfiles
                .Include(sp => sp.Employee).ThenInclude(e => e.UserQualifications).ThenInclude(q => q.Qualification)
                .Where(sp => sp.RecruiterId == myId)
                .ToList();

            var savedProfilesDto = _mapper.Map<List<SaveProfileDto>>(savedProfiles);

            return savedProfilesDto;
        }

    }
}
