# CineBook — Movie Ticket Booking System

ASP.NET Core MVC, C#, Entity Framework Core, and MySQL student project.

## Features
- Existing cinematic home page and movie catalogue UI
- Sign up and login with hashed passwords
- Authenticated ticket booking
- Booking records saved in MySQL
- Booking confirmation with booking ID
- My bookings page
- Logout

## Setup
1. Install the .NET 10 SDK and MySQL Server.
2. Open the `CineBook` folder in VS Code.
3. In `appsettings.json`, replace `YOUR_MYSQL_PASSWORD` with your local MySQL password. Do not commit real passwords to GitHub.
4. Run these commands in the project folder:

   ```powershell
   dotnet restore
   dotnet build
   dotnet ef migrations add AddUsersAndBookingPrecision
   dotnet ef database update
   dotnet run
   ```

5. Open the local URL printed by `dotnet run`, sign up, select a movie, choose a showtime, and confirm a booking.
6. In MySQL Workbench, verify saved bookings with:

   ```sql
   USE CineBookDB;
   SELECT * FROM Bookings ORDER BY Id DESC;
   SELECT Id, FullName, Email, CreatedAt FROM Users;
   ```

## Notes
- The app uses the existing demo movie catalogue in the frontend. A booking creates a minimal Movie row if its title is not already present, so the booking foreign key can be stored.
- Movie titles, prices, and showtimes are demo catalogue data; this is a student demonstration, not a payment-processing system.
- Passwords are stored as hashes, not as plain text.
- Keep your local database password out of GitHub.
