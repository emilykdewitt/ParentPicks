﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPicks.DTOs
{
    public class AddUserRegistryProductDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int QuantityNeeded { get; set; }
    }
}
