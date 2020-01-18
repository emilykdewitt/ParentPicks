using ParentPicks.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPicks.DataAccess
{
    public interface IUserRegistryProductRepository
    {
        IEnumerable<UserRegistryProductRepository> GetAllUserRegistryProducts();
        bool AddNewUserRegistryProduct(AddUserRegistryProductDTO userRegistryProductToAdd);
        bool UpdateUserRegistryProduct(int userRegistryProductId, UpdateUserRegistryProductDTO userRegistryProductToUpdate);
        bool DeleteUserRegistryProduct(int userRegistryProductId);

    }
}
