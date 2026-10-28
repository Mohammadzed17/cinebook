(() => {
  "use strict";

  const fallbackPoster = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=85";
  const movies = [
    {
      id: "jailer-2", title: "Jailer 2", year: 2026, genres: ["Action", "Thriller"], rating: 8.7,
      duration: "2h 45m", certificate: "UA 16+", language: "Tamil · Hindi",
      price: 220, badge: "FAN FAVOURITE",
      poster: "https://m.media-amazon.com/images/M/MV5BYmE0MTFjOTYtMWYxNC00YjFjLTlhNzYtMWQ5ZDEwNjRmYzE1XkEyXkFqcGc%40._V1_.jpg",
      description: "A legendary figure is pulled back into a dangerous world where loyalty, family, and unfinished business collide. A sample listing for the CineBook movie-booking demo."
    },
    {
      id: "spider-man-bnd", title: "Spider-Man: Brand New Day", year: 2026, genres: ["Action", "Sci-Fi"], rating: 8.4,
      duration: "2h 25m", certificate: "UA 13+", language: "English · Hindi",
      price: 280, badge: "NEW RELEASE",
      poster: "https://b4uentertainment.com/sites/default/files/styles/most_read/public/2026-08/Images%20tweeted%20by%20Marvel%20Entertainment.jpg.webp?itok=utMp_-6Y",
      description: "Peter Parker faces a new chapter as a full-time hero in a city that has moved on without him. A high-energy superhero adventure presented here as demo catalogue content."
    },
    {
      id: "dune-two", title: "Dune: Part Two", year: 2024, genres: ["Sci-Fi", "Drama"], rating: 8.6,
      duration: "2h 46m", certificate: "UA 13+", language: "English · Hindi",
      price: 250, badge: "CINEBOOK PICK",
      poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
      description: "A sweeping science-fiction epic about destiny, power, and a desert world that will shape the future of an empire."
    },
    {
      id: "kalki", title: "Kalki 2898 AD", year: 2024, genres: ["Action", "Sci-Fi"], rating: 8.1,
      duration: "3h 1m", certificate: "UA 13+", language: "Telugu · Hindi",
      price: 240, badge: "INDIAN EPIC",
      poster: "https://image.tmdb.org/t/p/w500/1kLa6u8y0Tz4s2q6Ywz8Q5f5pQH.jpg",
      description: "Mythology and futuristic spectacle meet in a world where an ancient prophecy points towards humanity's next chapter."
    },
    {
      id: "interstellar", title: "Interstellar", year: 2014, genres: ["Sci-Fi", "Drama"], rating: 8.9,
      duration: "2h 49m", certificate: "UA 13+", language: "English · Hindi",
      price: 200, badge: "ALL-TIME CLASSIC",
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      description: "A team travels beyond the limits of our world in a desperate search for a future for humanity. Big ideas, bigger feelings."
    },
    {
      id: "batman", title: "The Batman", year: 2022, genres: ["Action", "Thriller"], rating: 8.2,
      duration: "2h 56m", certificate: "UA 16+", language: "English · Hindi",
      price: 230, badge: "",
      poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      description: "A young vigilante follows a trail of clues through a city full of corruption, secrets, and shadows."
    },
    {
      id: "pushpa-2", title: "Pushpa 2: The Rule", year: 2024, genres: ["Action", "Drama"], rating: 7.8,
      duration: "3h 20m", certificate: "UA 16+", language: "Telugu · Hindi",
      price: 220, badge: "MASS ENTERTAINER",
      poster: "https://image.tmdb.org/t/p/w500/1F7E3c4Q6f7c5a6Y5Y4b5f5Y5Y5.jpg",
      description: "Power, pride, and a relentless rise collide in a larger-than-life action drama. Demo description for the movie card."
    },
    {
      id: "mission-impossible", title: "Mission: Impossible", year: 2025, genres: ["Action", "Thriller"], rating: 8.0,
      duration: "2h 49m", certificate: "UA 13+", language: "English · Hindi",
      price: 260, badge: "EDGE OF YOUR SEAT",
      poster: "https://image.tmdb.org/t/p/w500/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
      description: "A high-stakes mission pushes a team to the limit with daring stunts, impossible choices, and a race against time."
    },
    {
      id: "inside-out-2", title: "Inside Out 2", year: 2024, genres: ["Drama"], rating: 8.0,
      duration: "1h 36m", certificate: "U", language: "English · Hindi",
      price: 180, badge: "FAMILY PICK",
      poster: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
      description: "A new set of emotions arrives as growing up brings fresh feelings, unexpected challenges, and plenty of heart."
    },
    {
      id: "avatar", title: "Avatar: The Way of Water", year: 2022, genres: ["Action", "Sci-Fi"], rating: 8.3,
      duration: "3h 12m", certificate: "UA 13+", language: "English · Hindi",
      price: 300, badge: "IMMERSIVE PICK",
      poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
      description: "Return to Pandora for an expansive adventure across oceans, family bonds, and a breathtaking alien world."
    }
  ];

  const state = { genre: "All", query: "", sort: "featured", selectedMovie: null, selectedTime: null };
  const grid = document.getElementById("movieGrid");
  const searchInput = document.getElementById("movieSearch");
  const genreFilters = document.getElementById("genreFilters");
  const sortSelect = document.getElementById("movieSort");
  const count = document.getElementById("movieCount");
  const emptyState = document.getElementById("emptyState");
  const modal = document.getElementById("movieModal");
  const toast = document.getElementById("toastMessage");

  if (!grid) return;

  function safeText(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));
  }

  function posterMarkup(movie, extraClass = "") {
    const title = safeText(movie.title);
    const poster = safeText(movie.poster);
    return `<img class="${extraClass}" src="${poster}" alt="${title} poster" loading="lazy" onerror="this.onerror=null;this.src='${fallbackPoster}'">`;
  }

  function renderMovies() {
    let list = movies.filter(movie => {
      const matchesGenre = state.genre === "All" || movie.genres.includes(state.genre);
      const searchable = `${movie.title} ${movie.genres.join(" ")} ${movie.language}`.toLowerCase();
      return matchesGenre && searchable.includes(state.query.toLowerCase());
    });

    if (state.sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (state.sort === "title") list = [...list].sort((a, b) => a.title.localeCompare(b.title));

    count.textContent = list.length;
    emptyState.hidden = list.length > 0;
    grid.hidden = list.length === 0;

    grid.innerHTML = list.map((movie, index) => `
      <article class="movie-card" style="animation-delay:${Math.min(index * 45, 300)}ms">
        <div class="movie-poster-wrap">
          ${posterMarkup(movie, "movie-poster")}
          ${movie.badge ? `<span class="movie-badge ${movie.badge === "NEW RELEASE" ? "hot" : ""}">${safeText(movie.badge)}</span>` : ""}
          <span class="rating-pill">★ ${movie.rating.toFixed(1)}</span>
          <button class="quick-view" type="button" data-movie-id="${movie.id}">View details & showtimes ↗</button>
        </div>
        <div class="movie-info">
          <div class="movie-title-row"><h3 class="movie-title">${safeText(movie.title)}</h3><span class="movie-year">${movie.year}</span></div>
          <div class="movie-subline"><span>${safeText(movie.genres[0])}</span><span class="dot"></span><span>${safeText(movie.duration)}</span></div>
          <div class="movie-card-bottom"><span class="movie-price">Tickets from <strong>₹${movie.price}</strong></span><button class="card-arrow" type="button" data-movie-id="${movie.id}" aria-label="View ${safeText(movie.title)} details">↗</button></div>
        </div>
      </article>
    `).join("");
  }

  function openMovie(movieId) {
    const movie = movies.find(item => item.id === movieId);
    if (!movie) return;
    state.selectedMovie = movie;
    state.selectedTime = null;

    document.getElementById("modalPoster").src = movie.poster;
    document.getElementById("modalPoster").onerror = function () { this.onerror = null; this.src = fallbackPoster; };
    document.getElementById("modalPoster").alt = `${movie.title} poster`;
    document.getElementById("modalMovieTitle").textContent = movie.title;
    document.getElementById("modalRating").textContent = `★ ${movie.rating.toFixed(1)}  ·  ${movie.certificate}`;
    document.getElementById("modalMeta").textContent = `${movie.year}  •  ${movie.duration}  •  ${movie.genres.join(" / ")}  •  ${movie.language}`;
    document.getElementById("modalDescription").textContent = movie.description;

    const times = ["10:30 AM", "1:45 PM", "5:15 PM", "8:30 PM"];
    document.getElementById("showtimeOptions").innerHTML = times.map(time =>
      `<button class="showtime-option" type="button" data-showtime="${time}">${time}</button>`
    ).join("");
    document.getElementById("bookingSummary").hidden = true;
    document.getElementById("confirmShowtimeBtn").disabled = true;
    document.getElementById("confirmShowtimeBtn").innerHTML = 'Choose a showtime <span>→</span>';
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    state.selectedMovie = null;
    state.selectedTime = null;
  }

  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  grid.addEventListener("click", event => {
    const trigger = event.target.closest("[data-movie-id]");
    if (trigger) openMovie(trigger.dataset.movieId);
  });

  genreFilters.addEventListener("click", event => {
    const button = event.target.closest("[data-genre]");
    if (!button) return;
    state.genre = button.dataset.genre;
    genreFilters.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("active", chip === button));
    renderMovies();
  });

  searchInput.addEventListener("input", () => {
    state.query = searchInput.value.trim();
    renderMovies();
  });

  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    renderMovies();
  });

  document.getElementById("resetFiltersBtn").addEventListener("click", () => {
    state.genre = "All";
    state.query = "";
    state.sort = "featured";
    searchInput.value = "";
    sortSelect.value = "featured";
    genreFilters.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("active", chip.dataset.genre === "All"));
    renderMovies();
  });

  document.getElementById("surpriseMeBtn").addEventListener("click", () => {
    const pick = movies[Math.floor(Math.random() * movies.length)];
    openMovie(pick.id);
  });

  document.querySelectorAll("[data-feature-book]").forEach(button => {
    button.addEventListener("click", () => openMovie(button.dataset.featureBook));
  });

  modal.addEventListener("click", event => {
    if (event.target === modal || event.target.closest("[data-close-modal]")) closeModal();
    const timeButton = event.target.closest("[data-showtime]");
    if (timeButton) {
      state.selectedTime = timeButton.dataset.showtime;
      modal.querySelectorAll(".showtime-option").forEach(button => button.classList.toggle("selected", button === timeButton));
      const summary = document.getElementById("bookingSummary");
      summary.hidden = false;
      summary.innerHTML = `<strong>${safeText(state.selectedMovie.title)}</strong><br>${safeText(state.selectedTime)} · From ₹${state.selectedMovie.price} per ticket<br><span>Continue to confirm your booking and save it to your account.</span>`;
      const confirmButton = document.getElementById("confirmShowtimeBtn");
      confirmButton.disabled = false;
      confirmButton.innerHTML = 'Continue with this showtime <span>→</span>';
    }
  });

  document.getElementById("confirmShowtimeBtn").addEventListener("click", () => {
    if (!state.selectedMovie || !state.selectedTime) return;
    const movie = state.selectedMovie;
    const params = new URLSearchParams({ movieTitle: movie.title, price: String(movie.price), showTime: state.selectedTime });
    window.location.href = `/Booking/Create?${params.toString()}`;
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal && !modal.hidden) closeModal();
    if (event.key === "Enter" && document.activeElement === searchInput) {
      document.getElementById("now-showing").scrollIntoView({ behavior: "smooth" });
    }
  });

  renderMovies();
})();
