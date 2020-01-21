using ParentPicks.DTOs;
using ParentPicks.Models;
using System;
using Dapper;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPicks.DataAccess
{
    public class UserPersonalRepository : IUserPersonalRepository
    {
        string _connectionString = "Server=localhost;Database=ParentPicks;Trusted_Connection=True;";

        public IEnumerable<UserPersonal> GetAllUserPersonals()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Select * 
                            from UserPersonal";

                var allUserPersonals = db.Query<UserPersonal>(sql);

                return allUserPersonals;
            }
        }

        public UserPersonal GetUserPersonal(int userId)
        {
            using (var db = new SqlConnection(_connectionString)) 
            {
                var sql = @"Select * from UserPersonal where [UserId] = @UserId";
                var parameters = new
                {
                    UserId = userId
                };
                var userPersonal = db.QueryFirst<UserPersonal>(sql, parameters);
                return userPersonal;
            }
        }

        public bool AddNewUserPersonal(AddUserPersonalDTO userPersonalToAdd)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO[dbo].[UserPersonal]
                                ([UserId]
                                ,[FirstName]
                                ,[LastName]
                                ,[Location]
                                ,[Email]
                                ,[Bio])
                             VALUES
                                (@UserId
                                , @FirstName
                                , @LastName
                                , @Location
                                , @Email
                                , @Bio)";
                return db.Execute(sql, userPersonalToAdd) == 1;
            }
        }

        public bool UpdateUserPersonal(int userPersonalId, UpdateUserPersonalDTO userPersonalToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Update [UserPersonal]
                            SET [UserId] = @UserId
                            ,[FirstName] = @FirstName
                            ,[LastName] = @LastName
                            ,[Location] = @Location
                            ,[Email] = @Email
                            ,[Bio] = @Bio)";
                userPersonalToUpdate.Id = userPersonalId;

                return db.Execute(sql, userPersonalToUpdate) == 1;

            }
        }

        public bool DeleteUserPersonal(int userPersonalId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Delete
                            from UserPersonal
                            where [Id] = @userPersonalId";

                return db.Execute(sql, new { userPersonalId }) == 1;
            }
        }
    }
}
