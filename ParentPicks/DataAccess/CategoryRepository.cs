using Dapper;
using ParentPicks.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPicks.DataAccess
{
    public class CategoryRepository : ICategoryRepository
    {
        string _connectionString = "Server=localhost;Database=ParentPicks;Trusted_Connection=True;";

        public IEnumerable<Category> GetAllCategories()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Select *
                        from Category";

                var allCategories = db.Query<Category>(sql);

                return allCategories;
            }
        }
    }


}
