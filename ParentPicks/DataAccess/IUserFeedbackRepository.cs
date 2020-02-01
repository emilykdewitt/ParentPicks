using ParentPicks.DTOs;
using ParentPicks.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPicks.DataAccess
{
    public interface IUserFeedbackRepository
    {
        IEnumerable<UserFeedback> GetAllUserFeedbacks();
        IEnumerable<ProductWithUserFeedbackDTO> GetUserFeedbacksByUserId(int userId);
        IEnumerable<UserFeedback> GetUserFeedbacksByProductId(int productId);
        bool AddNewUserFeedback(AddUserFeedbackDTO userFeedbackToAdd);
        bool UpdateUserFeedback(int userFeedbackId, UpdateUserFeedbackDTO userPersonalToUpdate);
        bool DeleteUserFeedback(int userFeedbackId);
    }
}
