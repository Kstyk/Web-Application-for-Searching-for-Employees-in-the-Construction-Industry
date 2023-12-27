namespace AI2_Backend.Models
{
    public class QualificationStatDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CandidatesNum { get; set; }
        public int MinSalary { get; set; }
        public int MaxSalary { get; set; }
        public int AvgSalary { get; set; }
    }
}
