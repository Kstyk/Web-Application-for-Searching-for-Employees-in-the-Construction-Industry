using AI2_Backend.Models.Queries;
using AI2_Backend.Models;

namespace AI2_Backend.Services
{
    public interface IStatService
    {
        PagedResult<QualificationStatDto> GetQualificationsStat(StatQuery query);
        bool UpdateVisitsStat(int employeeId);
    }
}
