document.addEventListener('DOMContentLoaded', function () {
    const filmsMenu = document.getElementById('films');
    const movieDetails = document.getElementById('movie-details');
    const posterElement = document.getElementById('poster');
    const titleElement = document.getElementById('title');
    const runtimeElement = document.getElementById('runtime');
    const showtimeElement = document.getElementById('showtime');
    const ticketsElement = document.getElementById('tickets');
    const buyTicketButton = document.getElementById('buyTicket');
  
    const API_URL = 'http://localhost:3000/films';
  
    let selectedFilm = null;
  
    // Fetch the movie list from the server
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((movie) => {
          const filmItem = document.createElement('li');
          filmItem.classList.add('film-item');
          filmItem.textContent = movie.title;
          filmsMenu.appendChild(filmItem);
  
          filmItem.addEventListener('click', () => {
            showMovieDetails(movie);
          });
        });
  
        // Show details of the first movie by default
        if (data.length > 0) {
          showMovieDetails(data[0]);
        }
      });
  
    function showMovieDetails(movie) {
      selectedFilm = movie;
      posterElement.src = movie.poster;
      titleElement.textContent = movie.title;
      runtimeElement.textContent = `Runtime: ${movie.runtime} minutes`;
      showtimeElement.textContent = `Showtime: ${movie.showtime}`;
      ticketsElement.textContent = `Available Tickets: ${movie.tickets}`;
  
      buyTicketButton.disabled = movie.tickets === 0;
    }
  
    buyTicketButton.addEventListener('click', () => {
      if (selectedFilm) {
        // Simulate buying a ticket by reducing the available tickets count
        selectedFilm.tickets--;
        ticketsElement.textContent = `Available Tickets: ${selectedFilm.tickets}`;
        buyTicketButton.disabled = selectedFilm.tickets === 0;
      }
    });
  });
  