using ParentPicks.DTOs;
using ParentPicks.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPicks.DataAccess
{
    public interface IUserRegistryProductRepository
    {
        IEnumerable<UserRegistryProduct> GetAllUserRegistryProducts();
        bool AddUserRegistryProduct(AddUserRegistryProductDTO userRegistryProductToAdd);
        bool UpdateUserRegistryProduct(int userRegistryProductId, UpdateUserRegistryProductDTO userRegistryProductToUpdate);
        bool DeleteUserRegistryProduct(int userRegistryProductId);

    }
}
