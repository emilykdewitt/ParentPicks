using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPicks.DTOs
{
    public class AddUserDTO
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public int FirebaseKey { get; set; }
    }
}
