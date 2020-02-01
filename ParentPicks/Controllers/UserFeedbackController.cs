using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ParentPicks.DataAccess;
using ParentPicks.DTOs;
using ParentPicks.Models;

namespace ParentPicks.Controllers
{
    [Route("api/userFeedback")]
    [ApiController]
    public class UserFeedbackController : ControllerBase
    {
        private readonly IUserFeedbackRepository _repo;

        public UserFeedbackController(IUserFeedbackRepository repo)
        {
            _repo = repo;
        }

        //GET all user feedbacks (ratings and reviews)
        [HttpGet]
        public IEnumerable<UserFeedback> GetAllUserFeedbacks()
        {
            return _repo.GetAllUserFeedbacks();
        }

        //GET all user feedback by user id
        [HttpGet("user/{userId}")]
        public IEnumerable<ProductWithUserFeedbackDTO> GetUserFeedbacksByUserId(int userId)
        {
            return _repo.GetUserFeedbacksByUserId(userId);
        }

        //GET all user feedbacks by product id
        [HttpGet("product/{productId}")]
        public IEnumerable<UserFeedback> GetUserFeedbacksByProductId(int productId)
        {
            return _repo.GetUserFeedbacksByProductId(productId);
        }

        //POST new user feedback
        [HttpPost]
        public IEnumerable<ProductWithUserFeedbackDTO> AddUserFeedback(AddUserFeedbackDTO userFeedbackToAdd)
        {
            _repo.AddNewUserFeedback(userFeedbackToAdd);
            return _repo.GetUserFeedbacksByUserId(userFeedbackToAdd.UserId);
        }

        //PUT updated user feedback
        [HttpPut("update/{userFeedbackId}")]
        public IActionResult UpdateUserFeedbackById(int userFeedbackId, UpdateUserFeedbackDTO userFeedbackToUpdate)
        {
            _repo.UpdateUserFeedback(userFeedbackId, userFeedbackToUpdate);
            return Ok();
        }

        //DELETE user feedback
        [HttpDelete("{userFeedbackId}")]
        public IActionResult DeleteUserFeedback(int userFeedbackId)
        {
            _repo.DeleteUserFeedback(userFeedbackId);
            return Ok();
        }


    }
}