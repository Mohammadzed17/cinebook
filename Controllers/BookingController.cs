using System.Security.Claims;
using CineBook.Data;
using CineBook.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CineBook.Controllers;
[Authorize]
public class BookingController : Controller
{
    private readonly CineBookContext _db;
    public BookingController(CineBookContext db) => _db = db;

    [HttpGet]
    public IActionResult Create(string movieTitle, decimal price, string showTime)
    {
        ViewBag.MovieTitle = string.IsNullOrWhiteSpace(movieTitle) ? "Movie selection" : movieTitle;
        ViewBag.Price = price > 0 ? price : 220m;
        ViewBag.ShowTime = string.IsNullOrWhiteSpace(showTime) ? "7:00 PM" : showTime;
        return View();
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(string movieTitle, decimal price, string showTime, int numberOfTickets)
    {
        if (string.IsNullOrWhiteSpace(movieTitle) || movieTitle.Length > 150 || price < 1 || price > 10000 ||
            numberOfTickets < 1 || numberOfTickets > 10 ||
            !new[] { "10:30 AM", "1:45 PM", "5:15 PM", "8:30 PM", "7:00 PM" }.Contains(showTime))
        { ViewBag.Error = "Please check the movie, showtime, price, and ticket quantity."; ViewBag.MovieTitle = movieTitle; ViewBag.Price = price; ViewBag.ShowTime = showTime; return View(); }

        var userIdText = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdText, out var userId)) return Challenge();
        var user = await _db.Users.FindAsync(userId);
        if (user == null) return Challenge();
        var movie = await _db.Movies.FirstOrDefaultAsync(m => m.Title == movieTitle);
        if (movie == null)
        {
            movie = new Movie { Title = movieTitle, Description = "Movie selected from the CineBook demo catalogue.", Genre = "Cinema", DurationMinutes = 120, TicketPrice = price, Rating = 0, ReleaseYear = DateTime.Now.Year, PosterUrl = "" };
            _db.Movies.Add(movie);
            await _db.SaveChangesAsync();
        }
        var booking = new Booking { CustomerName = user.FullName, CustomerEmail = user.Email, MovieId = movie.Id, ShowTime = showTime, NumberOfTickets = numberOfTickets, TotalAmount = price * numberOfTickets, BookingDate = DateTime.Now, Status = "Confirmed" };
        _db.Bookings.Add(booking);
        await _db.SaveChangesAsync();
        return RedirectToAction(nameof(Confirmation), new { id = booking.Id });
    }

    public async Task<IActionResult> Confirmation(int id)
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        var booking = await _db.Bookings.Include(b => b.Movie).FirstOrDefaultAsync(b => b.Id == id && b.CustomerEmail == email);
        return booking == null ? NotFound() : View(booking);
    }

    public async Task<IActionResult> MyBookings()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        return View(await _db.Bookings.Include(b => b.Movie).Where(b => b.CustomerEmail == email).OrderByDescending(b => b.BookingDate).ToListAsync());
    }
}
