using AI2_Backend.Entities;
using AI2_Backend.Models;

namespace AI2_Backend.Services
{
    public interface IAccountService
    {
        UserProfileDto RegisterUser(RegisterUserDto dto);
        string GenerateJwt(LoginUserDto loginUserDto);
        void UpdateUser(UpdateUserDto updateUserDto);
        MyProfileDto GetLoggedUserProfile();
        void DeleteProfile();
    }
}