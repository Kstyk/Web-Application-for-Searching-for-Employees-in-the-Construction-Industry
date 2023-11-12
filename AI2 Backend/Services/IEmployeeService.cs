using AI2_Backend.Models;
using AI2_Backend.Models.Queries;

namespace AI2_Backend.Services
{
    public interface IEmployeeService
    {
        UserProfileDto GetEmployeeProfile(int employeeId);
        PagedResult<UserProfileDto> GetAll(EmployeeQuery query);
    }
}