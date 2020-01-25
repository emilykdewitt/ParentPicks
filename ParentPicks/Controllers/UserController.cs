using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParentPicks.DataAccess;
using ParentPicks.DTOs;
using ParentPicks.Models;

namespace ParentPicks.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController: FirebaseEnabledController
    {
        private readonly IUserRepository _repo;

        public UsersController(IUserRepository repo)
        {
            _repo = repo;
        }

        //GET: api/users
        [HttpGet]
        public IActionResult Get()
        {
            var users = _repo.GetAllUsers();

            return Ok(users.Select(u => new { u.FirstName,u.LastName,u.Location,u.Email,u.Bio }));
        }

        // GET: api/users/3
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var repo = new UserRepository();
            var user = repo.GetUserByUserId(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        //POST new user
        [HttpPost]
        public User AddUser(AddUserDTO userToAdd)
        {
            _repo.AddNewUser(userToAdd);
            return _repo.GetUserByUserId(userToAdd.Id);
        }

        //PUT updated user
        [HttpPut("update/{userId}"),Authorize]
        public IActionResult UpdateUserById(int userId, UpdateUserDTO userToUpdate)
        {
            _repo.UpdateUser(userId, userToUpdate);
            return Ok();
        }
    }
}