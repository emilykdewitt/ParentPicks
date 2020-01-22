using System;
using ParentPicks.DataAccess;
using ParentPicks.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ParentPicks.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Product> GetProducts()
        {
            var repo = new ProductRepository();
            var products = repo.GetAllProducts();
            return products;
        }

        [HttpGet("{productId}")]
        public Product GetProduct(int productId)
        {
            var repo = new ProductRepository();
            var product = repo.GetProduct(productId);
            return product;
        }

        [HttpGet("productType/{typeId}")]
        public IEnumerable<Product> GetProductsByCategoryId(int categoryId)
        {
            var repo = new ProductRepository();
            var productsWithCategoryId = repo.GetProductsByCategoryId(categoryId);
            return productsWithCategoryId;
        }


    }
}