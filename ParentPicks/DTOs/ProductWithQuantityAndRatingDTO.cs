using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPicks.DTOs
{
    public class ProductWithQuantityAndRatingDTO
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int RegProdId { get; set; }
        public string ProductImageUrl { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Description { get; set; }
        public int QuantityNeeded { get; set; }
        public int StarRating { get; set; }
    }
}
