using System.ComponentModel.DataAnnotations;

namespace CineBook.Models;

public class Booking
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string CustomerName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string CustomerEmail { get; set; } = string.Empty;

    public int MovieId { get; set; }

    public Movie? Movie { get; set; }

    [Required]
    [StringLength(20)]
    public string ShowTime { get; set; } = string.Empty;

    public int NumberOfTickets { get; set; }

    public decimal TotalAmount { get; set; }

    public DateTime BookingDate { get; set; } = DateTime.Now;

    [StringLength(30)]
    public string Status { get; set; } = "Confirmed";
}