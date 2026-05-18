using Microsoft.EntityFrameworkCore;

namespace greenhome.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(
            DbContextOptions<AppDbContext> options
        ) : base(options)
        {
        }

        public DbSet<Plant> Plants { get; set; }

        public DbSet<Category> Categories { get; set; }
    }
}
