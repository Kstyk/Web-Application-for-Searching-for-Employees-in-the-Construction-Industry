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

        public RegisterUserDto(string email, string password, string confirmPassword, int roleId, string firstName, string lastName)
        {
            Email = email;
            Password = password;
            ConfirmPassword = confirmPassword;
            RoleId = roleId;
            FirstName = firstName;
            LastName = lastName;
        }

        public RegisterUserDto()
        {
            
        }
    }
}
