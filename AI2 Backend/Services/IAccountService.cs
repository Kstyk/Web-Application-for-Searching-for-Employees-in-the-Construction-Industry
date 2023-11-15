using AI2_Backend.Models;

namespace AI2_Backend.Services
{
    public interface IAccountService
    {
        void RegisterUser(RegisterUserDto dto);
        string GenerateJwt(LoginUserDto loginUserDto);
        void UpdateUser(UpdateUserDto updateUserDto);
        UserProfileDto GetLoggedUserProfile();
        void DeleteProfile();
    }
}