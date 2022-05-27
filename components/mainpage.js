export const mainPage = (films, featured) =>
  `<div
  class="featured-content"
  style="
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #151515),
      url('img/background.jpg');
  "
  >
  <img class="featured-title" src="img/${featured.id}.jpg" alt="" />
  <p class="featured-desc">
    ${featured.description}
  </p>
  <a class="featured-button" id="${featured.id}-featured-btn">Buy ticket</a>
  </div>
  <div class="movie-list-container">
  <h1 class="movie-list-title">NEW RELEASES</h1>
  <div class="movie-list-wrapper">
  <div class="movie-list">${films
    .map(
      (film) => `<div class="movie-list-item">
    <img class="movie-list-item-img" src="img/${film.id}.jpg" alt="" />
      <span class="movie-list-item-title">${film.name}</span>
      <p class="movie-list-item-desc">
      ${film.description}
      </p>
      <a class="movie-list-item-button" id="${film.id}-btn">Buy ticket</a>
    </div>`
    )
    .join("")}
    </div>
    <i class="fas fa-chevron-right arrow"></i>
  </div>
</div>`;
