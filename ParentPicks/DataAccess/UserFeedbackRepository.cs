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
    public class UserFeedbackRepository : IUserFeedbackRepository
    {
        string _connectionString = "Server=localhost;Database=ParentPicks;Trusted_Connection=True;";
        
        public IEnumerable<UserFeedback> GetAllUserFeedbacks()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Select *
                            from UserFeedback";

                var allUserFeedbacks = db.Query<UserFeedback>(sql);

                return allUserFeedbacks;
            }
        }

        public IEnumerable<UserFeedback> GetUserFeedbacksByProductId(int productId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Select *
                            from UserFeedback
                            where ProductId = @productId";
                var parameters = new
                {
                    ProductId = productId
                };
                var userFeedbacks = db.Query<UserFeedback>(sql, parameters);
                return userFeedbacks;
            }
        }

        public ProductWithUserFeedbackDTO GetSingleFeedbackByFeedbackId(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Select *
                            from UserFeedback
                            where Id = @id";
                var parameters = new
                {
                    Id = id
                };
                var singleFeedback = db.QueryFirstOrDefault<ProductWithUserFeedbackDTO>(sql, parameters);
                return singleFeedback;
            }
        }

        public IEnumerable<ProductWithUserFeedbackDTO> GetUserFeedbacksByUserId(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT UF.*, P.Id as ProductId, P.CategoryId, P.[Name], P.Brand, P.ProductImageUrl
                            FROM UserFeedback UF
                            join Product P
                            on UF.ProductId = P.Id
                            join [User] U on U.Id = UF.UserId
                            where U.Id = @userId";

                var parameters = new
                {
                    UserId = userId
                };

                var userFeedbacks = db.Query<ProductWithUserFeedbackDTO>(sql, parameters);
                return userFeedbacks;
            }
        }


        public bool AddNewUserFeedback(AddUserFeedbackDTO userFeedbackToAdd)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO[dbo].[UserFeedback]
                            ([UserId]
                            ,[ProductId]
                            ,[StarRating]
                            ,[Review])
                            VALUES
                            (@UserId
                            , @ProductId
                            , @StarRating
                            , @Review)";

                return db.Execute(sql, userFeedbackToAdd) == 1;
            }
        }

        public bool UpdateUserFeedback(int userFeedbackId, UpdateUserFeedbackDTO userFeedbackToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Update [UserFeedback]
                          SET [StarRating] = @StarRating
                          ,[Review] = @Review
                          WHERE [Id] = @Id";

                userFeedbackToUpdate.Id = userFeedbackId;

                return db.Execute(sql, userFeedbackToUpdate) == 1;
            }
        }

        public bool DeleteUserFeedback(int userFeedbackId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE
                            from UserFeedback
                            where [Id] = @userFeedbackId";
                return db.Execute(sql, new { userFeedbackId }) == 1;
            }
        }
    }
}
