using AI2_Backend.Entities;
using AI2_Backend.Enums;
using AI2_Backend.Models;
using AI2_Backend.Models.Queries;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Security.Cryptography;

namespace AI2_Backend.Services
{
    public class StatService: IStatService
    {
        private AIDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContextService;

        public StatService(AIDbContext context, IMapper mapper, IUserContextService userContextService)
        {
            _context = context;
            _mapper = mapper;
            _userContextService = userContextService;
        }
        public PagedResult<QualificationStatDto> GetQualificationsStat(StatQuery query)
        {

            var baseQuery = _context.Qualifications
                .Where(r => (query.QualificationId == null || r.Id == query.QualificationId));

            //Sortowanie
            baseQuery = (query.SortDirection == SortDirection.ASC) ?
            baseQuery.OrderBy(r => r.Name) :
            baseQuery.OrderByDescending(r => r.Name);

            baseQuery = baseQuery.Include(e => e.UserQualifications).ThenInclude(em => em.User);

            // paginacja
            var qualifications = baseQuery
                .Skip(query.PageSize * (query.PageNumber - 1))
                .Take(query.PageSize)
                .ToList();



            var qualificationsStatDto = _mapper.Map<List<QualificationStatDto>>(qualifications);

            foreach (QualificationStatDto qual in qualificationsStatDto)
            {
                var requiredPayments = _context.UserQualifications.Where(q => q.QualificationId == qual.Id).Include(u => u.User).Select(s => s.User.RequiredPayment).ToArray();
                if (requiredPayments.Length > 0)
                {
                    qual.MaxSalary = (int)requiredPayments.MaxBy(x => x);
                    qual.MinSalary = (int)requiredPayments.MinBy(x => x);
                    qual.AvgSalary = (int)requiredPayments.Average(x => x);


                }

            }


            var result = new PagedResult<QualificationStatDto>(qualificationsStatDto, baseQuery.Count(), query.PageSize, query.PageNumber);

            return result;
        }
        public bool UpdateVisitsStat(int employeeId)
        {
            var stats = _context.Stats
                     .FirstOrDefault(u => u.Id == employeeId);
            if (stats != null)
            {
                stats.CounterDaily++;
                stats.CounterMonthly++;
                _context.Stats.Update(stats);
                _context.SaveChanges();

            }
            else
            {
                stats = new Stats();
                stats.CounterMonthly = 1;
                stats.CounterDaily = 1;
                stats.EmployeeId = employeeId;
                _context.Stats.Add(stats);
                _context.SaveChanges();

            }

            if (employeeId == 0)
            {
                return false;
            }

            return true;

        }
    }
}
