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
    public class UserRegistryProductRepository : IUserRegistryProductRepository
    {
        string _connectionString = "Server=localhost;Database=ParentPicks;Trusted_Connection=True;";

        public IEnumerable<UserRegistryProduct> GetAllUserRegistryProducts()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Select *
                            from [UserRegistryProduct]";

                var allUserRegistryProducts = db.Query<UserRegistryProduct>(sql);

                return allUserRegistryProducts;
            }
        }

        public IEnumerable<ProductWithQuantityAndRatingDTO> GetUserRegistryProductsByUserId(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT P.*, URP.QuantityNeeded, URP.Id as RegProdId,
                            (select avg(UF.StarRating) from UserFeedback UF where UF.ProductId = P.Id) StarRating
                            from UserRegistryProduct URP
                            join Product P
                            on URP.ProductId = P.Id
                            join [User] U on U.id = URP.UserId
                            where U.Id = @userId";

                var parameters = new
                {
                    UserId = userId
                };
                
                var userRegistryProducts = db.Query<ProductWithQuantityAndRatingDTO>(sql, parameters);
                return userRegistryProducts;
            }
        }

        public bool AddUserRegistryProduct(AddUserRegistryProductDTO userRegistryProductToAdd)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [dbo].[UserRegistryProduct]
                            ([UserId]
                            ,[ProductId]
                            ,[QuantityNeeded])
                            VALUES
                            (@UserId
                            , @ProductId
                            , @QuantityNeeded)";
                return db.Execute(sql, userRegistryProductToAdd) == 1;
            }
        }

        public bool UpdateUserRegistryProduct(int userRegistryProductId, UpdateUserRegistryProductDTO userRegistryProductToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Update [UserRegistryProduct]
                        SET [UserId] = @UserId
                        ,[ProductId] = @ProductId
                        ,[QuantityNeeded] = @QuantityNeeded
                        WHERE [Id] = @Id";

                userRegistryProductToUpdate.Id = userRegistryProductId;

                return db.Execute(sql, userRegistryProductToUpdate) == 1;
            }
        }

        public bool DeleteUserRegistryProduct(int userRegistryProductId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE
                            from UserRegistryProduct
                            where [Id] = @userRegistryProductId";
                return db.Execute(sql, new { userRegistryProductId }) == 1;
            }
        }
    }
}
