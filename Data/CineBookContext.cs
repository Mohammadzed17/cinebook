using CineBook.Models;
using Microsoft.EntityFrameworkCore;
namespace CineBook.Data;
public class CineBookContext : DbContext
{
    public CineBookContext(DbContextOptions<CineBookContext> options) : base(options) { }
    public DbSet<Movie> Movies => Set<Movie>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<AppUser> Users => Set<AppUser>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<AppUser>().HasIndex(u => u.Email).IsUnique();
        modelBuilder.Entity<Booking>().Property(b => b.TotalAmount).HasPrecision(10, 2);
        modelBuilder.Entity<Movie>().Property(m => m.TicketPrice).HasPrecision(10, 2);
    }
}
