using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ParentPicks.DataAccess;
using ParentPicks.Models;

namespace ParentPicks.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _repo;

        public CategoryController(ICategoryRepository repo)
        {
            _repo = repo;
        }

        //GET api/Category
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return _repo.GetAllCategories();
        }
    }
}