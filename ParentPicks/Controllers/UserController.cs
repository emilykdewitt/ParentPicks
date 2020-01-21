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
    [ApiController, Authorize]
    public class UsersController: FirebaseEnabledController
    {
        private readonly IUserRepository _repo;

        public UsersController(IUserRepository repo)
        {
            _repo = repo;
        }

        //GET: api/users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _repo.GetAllUsers();
        }
    }
}