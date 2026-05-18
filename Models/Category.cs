using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace greenhome.Models
{
    [Table("categories")]
    public class Category
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("slug")]
        public string Slug { get; set; }

        [Column("description")]
        public string Description { get; set; }

        public List<Plant> Plants { get; set; }
    }
}