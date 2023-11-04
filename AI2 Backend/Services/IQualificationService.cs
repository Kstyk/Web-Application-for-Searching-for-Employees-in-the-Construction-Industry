using AI2_Backend.Models;

namespace AI2_Backend.Services
{
    public interface IQualificationService
    {
        List<QualificationDto> GetAllQualifications();
    }
}