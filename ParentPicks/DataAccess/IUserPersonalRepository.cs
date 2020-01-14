using ParentPicks.DTOs;
using ParentPicks.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPicks.DataAccess
{
    public interface IUserPersonalRepository
    {
        IEnumerable<UserPersonal> GetAllUserPersonals();
        bool AddNewUserPersonal(AddUserPersonalDTO userToAdd);
        bool UpdateUserPersonal(int userPersonalId, UpdateUserPersonalDTO userPersonalToUpdate);
        bool DeleteUserPersonal(int userPersonalId);
    }
}
