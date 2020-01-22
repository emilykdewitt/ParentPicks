using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ParentPicks.DataAccess;
using ParentPicks.Models;

namespace ParentPicks.Controllers
{
    [Route("api/userPersonal")]
    [ApiController]
    public class UserPersonalController : ControllerBase
    {
        private readonly IUserPersonalRepository _repo;

        public UserPersonalController(IUserPersonalRepository repo)
        {
            _repo = repo;
        }

        // GET: api/UserPersonal
        [HttpGet]
        public IEnumerable<UserPersonal> Get()
        {
            return _repo.GetAllUserPersonals();
        }

        // Get: api/UserPersonal/3
        [HttpGet("{userId}")]
        public UserPersonal Get(int userId)
        {
            var repo = new UserPersonalRepository();
            var userPersonal = repo.GetUserPersonal(userId);
            return userPersonal;
        }

    }
}