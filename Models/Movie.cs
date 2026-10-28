using System.ComponentModel.DataAnnotations;

namespace CineBook.Models;

public class Movie
{
    public int Id { get; set; }

    [Required]
    [StringLength(150)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string Description { get; set; } = string.Empty;

    public string PosterUrl { get; set; } = string.Empty;

    [StringLength(100)]
    public string Genre { get; set; } = string.Empty;

    public int DurationMinutes { get; set; }

    public decimal TicketPrice { get; set; }

    public double Rating { get; set; }

    public int ReleaseYear { get; set; }
}