using ParentPicks.DTOs;
using ParentPicks.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPicks.DataAccess
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUsers();
        User GetUserByUserId(int userId);
        bool AddNewUser(AddUserDTO userToAdd);
        bool UpdateUser(int userId, UpdateUserDTO userToUpdate);
    }
}
