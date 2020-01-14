using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPicks.Models
{
    public class User
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public int FirebaseKey { get; set; }
    }
}
