namespace AI2_Backend.Models
{
    public class RegisterUserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public RegisterUserDto()
        {
            
        }
    }
}
