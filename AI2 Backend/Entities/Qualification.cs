namespace AI2_Backend.Entities
{
    public class Qualification
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<UserQualification> UserQualifications { get; set; }


        public Qualification()
        {
            
        }
    }
}
