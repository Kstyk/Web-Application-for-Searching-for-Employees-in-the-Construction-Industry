using AI2_Backend.Models;

namespace AI2_Backend.Services
{
    public interface IEmployeeService
    {
        UserProfileDto GetEmployeeProfile(int employeeId);
    }
}