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

        public User AddNewUser(AddUserDTO newUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO[dbo].[User]
                            ([DateCreated]
                            ,[FirebaseKey])
                            output inserted.*
                            VALUES
                            (@dateCreated
                            , @firebaseKey)";
                return db.QueryFirst<User>(sql, newUser);
            }
        }

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
    }
}
