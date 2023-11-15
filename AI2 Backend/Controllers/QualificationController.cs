using AI2_Backend.Models;
using AI2_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AI2_Backend.Controllers
{
    [Route("api/qualifications")]
    [ApiController]
    public class QualificationController : ControllerBase
    {
        private readonly IQualificationService _qualificationService;

        public QualificationController(IQualificationService qualificationService)
        {
            _qualificationService = qualificationService;
        }

        [HttpGet("")]
        public ActionResult<List<QualificationDto>> GetAllCategories()
        {
            var qualifications = _qualificationService.GetAllQualifications();

            return Ok(qualifications);
        }
    }
}
