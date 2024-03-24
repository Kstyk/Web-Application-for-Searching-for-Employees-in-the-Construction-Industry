using AI2_Backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace AI2_Backend.Models.Queries
{
    public class StatQuery
    {
        [Required]
        public int PageSize { get; set; } = 10;
        [Required]
        public int PageNumber { get; set; } = 1;
        public SortDirection? SortDirection { get; set; }
        public int? QualificationId { get; set; }
    }
}
