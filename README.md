# 🎬 CineBook — Movie Ticket Booking System

CineBook is a web-based movie ticket booking application developed as a college Web.NET project. It provides a cinema-style interface where users can explore movies, create accounts, log in, and book movie tickets.

## ✨ Features

- 🏠 **Home Page:** Modern cinema-inspired interface.
- 🎞️ **Movie Listings:** Browse movies and view their details.
- 🔐 **User Authentication:** Sign-up and login functionality.
- 🎟️ **Ticket Booking:** Select a movie, showtime, and number of tickets.
- 💾 **Database Integration:** Store user and booking information in MySQL.
- ✅ **Booking Confirmation:** View booking details after successful booking.
- 📋 **My Bookings:** Review saved bookings.

## 🛠️ Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** C#, ASP.NET Core MVC
- **Database:** MySQL
- **Database Access:** Entity Framework Core
- **Version Control:** Git and GitHub

## ⚙️ Prerequisites

Before running CineBook, install:

- [.NET SDK](https://dotnet.microsoft.com/download)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mohammadzed17/cinebook.git
cd cinebook
```

### 2. Configure MySQL

Create a local MySQL database named `CineBookDB`.

Configure your local connection string in your development settings. Do not commit passwords or other secrets to GitHub.

### 3. Restore dependencies

```bash
dotnet restore
```

### 4. Apply database migrations

```bash
dotnet ef database update
```

If the project has no existing migration files, create the initial migration before running this command.

### 5. Run the application

```bash
dotnet run
```

Open the local URL displayed in the terminal.

## 📁 Project Structure

```text
CineBook/
├── Controllers/
├── Data/
├── Models/
├── Views/
├── wwwroot/
├── Migrations/
├── Program.cs
├── appsettings.json
├── CineBook.csproj
└── README.md
```

## 🎯 Project Objective

The objective of CineBook is to demonstrate web application development using ASP.NET Core MVC, database integration, user authentication, and ticket booking workflows.

## 👨‍💻 Project Information

**Project:** CineBook — Movie Ticket Booking System  
**Category:** College Web.NET Project  
**Developer:** Mohammad Zaid

---

*Developed for academic learning and demonstration purposes.*