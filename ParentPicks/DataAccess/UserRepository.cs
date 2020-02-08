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
    public class UserRepository : IUserRepository
    {
        string _connectionString = "Server=localhost;Database=ParentPicks;Trusted_Connection=True;";

        public IEnumerable<User> GetAllUsers()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            from [User]";

                var users = db.Query<User>(sql);

                return users;
            }
        }

        public User GetUserByFirebaseUserId(string firebaseId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            from [User]
                            where [firebasekey] = @id";
                var parameters = new
                {
                    Id = firebaseId
                };
                var user = db.QueryFirstOrDefault<User>(sql, parameters);
                return user;
            }
        }


        public User GetUserByUserId(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            from [User]
                            where [Id] = @id";
                var parameters = new
                {
                    Id = id
                };
                var user = db.QueryFirstOrDefault<User>(sql, parameters);
                return user;
            }
        }

        public bool AddNewUser(AddUserDTO userToAdd)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO[dbo].[User]
                                ([DateCreated]
                                ,[FirebaseKey]
                                ,[FirstName]
                                ,[LastName]
                                ,[Location]
                                ,[Email]
                                ,[Password]
                                ,[Bio]
                                ,[ProfilePhotoUrl])
                             VALUES
                                (@DateCreated
                                , @FirebaseKey
                                , @FirstName
                                , @LastName
                                , @Location
                                , @Email
                                , @Password
                                , @Bio
                                , @ProfilePhotoUrl)";
                return db.Execute(sql, userToAdd) == 1;
            }
        }

        public bool UpdateUser(int id, UpdateUserDTO userToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Update [User]
                            SET [FirstName] = @FirstName
                            ,[LastName] = @LastName
                            ,[Location] = @Location
                            ,[Bio] = @Bio
                            ,[ProfilePhotoUrl] = @ProfilePhotoUrl
                            output inserted.*
                            where [Id] = @id";

                userToUpdate.Id = id;

                return db.Execute(sql, userToUpdate) == 1;

            }
        }
    }
}
