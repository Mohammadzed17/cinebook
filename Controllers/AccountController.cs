using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using CineBook.Data;
using CineBook.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CineBook.Controllers;
public class AccountController : Controller
{
    private readonly CineBookContext _db;
    private readonly PasswordHasher<AppUser> _hasher = new();
    public AccountController(CineBookContext db) => _db = db;

    [HttpGet] public IActionResult Signup() => View();
    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Signup(string fullName, string email, string password, string confirmPassword)
    {
        fullName = (fullName ?? "").Trim(); email = (email ?? "").Trim().ToLowerInvariant();
        if (fullName.Length < 2 || !new System.ComponentModel.DataAnnotations.EmailAddressAttribute().IsValid(email) || password.Length < 8 || password != confirmPassword)
        { ViewBag.Error = "Enter a valid name and email. Passwords must match and contain at least 8 characters."; return View(); }
        if (await _db.Users.AnyAsync(u => u.Email == email)) { ViewBag.Error = "An account with this email already exists. Please log in."; return View(); }
        var user = new AppUser { FullName = fullName, Email = email };
        user.PasswordHash = _hasher.HashPassword(user, password);
        _db.Users.Add(user);
        try { await _db.SaveChangesAsync(); }
        catch (DbUpdateException) { ViewBag.Error = "Could not create the account. Check your database and try again."; return View(); }
        await SignInUser(user);
        return RedirectToAction("Index", "Home");
    }

    [HttpGet] public IActionResult Login(string? returnUrl = null) { ViewBag.ReturnUrl = returnUrl; return View(); }
    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(string email, string password, string? returnUrl = null)
    {
        email = (email ?? "").Trim().ToLowerInvariant();
        var user = await _db.Users.SingleOrDefaultAsync(u => u.Email == email);
        if (user == null || _hasher.VerifyHashedPassword(user, user.PasswordHash, password ?? "") == PasswordVerificationResult.Failed)
        { ViewBag.Error = "Email or password is incorrect."; ViewBag.ReturnUrl = returnUrl; return View(); }
        await SignInUser(user);
        if (!string.IsNullOrWhiteSpace(returnUrl) && Url.IsLocalUrl(returnUrl)) return Redirect(returnUrl);
        return RedirectToAction("Index", "Home");
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync("CineBookCookie");
        return RedirectToAction("Index", "Home");
    }

    private async Task SignInUser(AppUser user)
    {
        var claims = new List<Claim> { new(ClaimTypes.NameIdentifier, user.Id.ToString()), new(ClaimTypes.Name, user.FullName), new(ClaimTypes.Email, user.Email) };
        await HttpContext.SignInAsync("CineBookCookie", new ClaimsPrincipal(new ClaimsIdentity(claims, "CineBookCookie")));
    }
}
