using System.ComponentModel.DataAnnotations.Schema;

namespace greenhome.Models
{
    [Table("plants")]
    public class Plant
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("latin_name")]
        public string LatinName { get; set; }

        [Column("slug")]
        public string Slug { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("size")]
        public string Size { get; set; }

        [Column("watering")]
        public string Watering { get; set; }

        [Column("light")]
        public string Light { get; set; }

        [Column("soil")]
        public string Soil { get; set; }

        [Column("temperature")]
        public string Temperature { get; set; }

        [Column("image")]
        public string Image { get; set; }

        [Column("category_id")]
        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
    }
}
