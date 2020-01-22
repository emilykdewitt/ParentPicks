using Dapper;
using ParentPicks.DTOs;
using ParentPicks.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPicks.DataAccess
{
    public class ProductRepository : IProductRepository
    {
        string _connectionString = "Server=localhost;Database=ParentPicks;Trusted_Connection=True;";

        public bool AddNewProduct(AddProductDTO productToAdd)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [dbo].[Product]
                            ([Category]
                            ,[Name]
                            ,[Brand]
                            ,[Description])
                            output inserted.*
                             VALUES
                            (@Category
                            ,@Name
                            ,@Brand
                            ,@Description)";

                return db.Execute(sql, productToAdd) == 1;
            }
        }

        public Product GetProduct(int productId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Select *
                            from Product
                            where [Id] = @ProductId";
                var parameters = new
                {
                    ProductId = productId
                };
                var product = db.QueryFirst<Product>(sql, parameters);
                return product;
            }
        }

        public IEnumerable<Product> GetAllProducts()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Select *
                            from [Product]";

                var products = db.Query<Product>(sql);

                return products;
            }
        }

        public IEnumerable<Product> GetProductsByCategoryId(int categoryId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Select * from Product 
                          where CategoryId = @categoryId";
                var parameters = new
                {
                    CategoryId = categoryId
                };

                var products = db.Query<Product>(sql, parameters);

                return products;
            }
        }
    }
}
