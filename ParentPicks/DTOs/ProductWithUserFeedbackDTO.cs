using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPicks.DTOs
{
    public class ProductWithUserFeedbackDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string CategoryId { get; set; }
        public string ProductImageUrl { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public decimal StarRating { get; set; }
        public string Review { get; set; }
    }
}
