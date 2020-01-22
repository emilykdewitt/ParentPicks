using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ParentPicks.DataAccess;
using ParentPicks.DTOs;
using ParentPicks.Models;

namespace ParentPicks.Controllers
{
    [Route("api/userRegistryProduct")]
    [ApiController]
    public class UserRegistryProductController : Controller
    {
        private readonly IUserRegistryProductRepository _repo;

        public UserRegistryProductController(IUserRegistryProductRepository repo)
        {
            _repo = repo;
        }

        //GET: api/UserRegistryProduct
        [HttpGet("{userId}")]
        public IEnumerable<UserRegistryProduct> GetByUserId(int userId)
        {
            return _repo.GetUserRegistryProductsByUserId(userId);
        }

        //POST new user registry product
        [HttpPost]
        public IEnumerable<UserRegistryProduct> AddUserRegistryProduct(AddUserRegistryProductDTO userRegistryProductToAdd)
        {
            _repo.AddUserRegistryProduct(userRegistryProductToAdd);
            return _repo.GetUserRegistryProductsByUserId(userRegistryProductToAdd.UserId);
        }

        //PUT updated user feedback
        [HttpPut("update/{userRegistryProductId}")]
        public IActionResult UpdateUserRegistryProductById(int userRegistryProductId, UpdateUserRegistryProductDTO userRegistryProductToUpdate)
        {
            _repo.UpdateUserRegistryProduct(userRegistryProductId, userRegistryProductToUpdate);
            return Ok();
        }

        //DELETE user feedback
        [HttpDelete("{userRegistryProductId}")]
        public IActionResult DeleteUserRegistryProduct(int userRegistryProductId)
        {
            _repo.DeleteUserRegistryProduct(userRegistryProductId);
            return Ok();
        }

    }
}