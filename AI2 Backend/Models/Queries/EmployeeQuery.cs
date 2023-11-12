using AI2_Backend.Enums;

namespace AI2_Backend.Models.Queries
{
    public class EmployeeQuery
    {
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
        public string? SortBy { get; set; } = "FirstName";
        public SortDirection? SortDirection { get; set; }

        public string? SearchText { get; set; }
        public int? MinimumPayment { get; set; }
        public int? MaximumPayment{ get; set; }
        public Voivodeship? Voivodeship { get; set; } = null;
        public int? QualificationId { get; set; }

    }
}
