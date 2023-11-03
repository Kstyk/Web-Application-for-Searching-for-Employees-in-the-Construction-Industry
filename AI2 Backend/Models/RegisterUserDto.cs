using AI2_Backend.Enums;

namespace AI2_Backend.Models
{
    public class RegisterUserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public int RoleId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? AboutMe { get; set; }
        public string? Education { get; set; }
        public Voivodeship? Voivodeship { get; set; }
        public decimal? RequiredPayment { get; set; }

        public RegisterUserDto()
        {
            
        }
    }
}
