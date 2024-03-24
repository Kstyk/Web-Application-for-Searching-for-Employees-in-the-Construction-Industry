﻿using AI2_Backend.Entities;
using AI2_Backend.Models;
using AI2_Backend.Models.Queries;

namespace AI2_Backend.Services
{
    public interface IEmployeeService
    {
        UserProfileDto GetEmployeeProfile(int employeeId);
        PagedResult<UserProfileDto> GetAll(EmployeeQuery query);
        bool SaveProfile(int employeeId);
        bool DeleteSavedProfile(int savedProfileId);
        List<SaveProfileDto> GetSavedProfiles();
    }
}