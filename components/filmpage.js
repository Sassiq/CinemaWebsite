export const filmPage = (film) => `
<div
class="page-background"
style="background-image: url('img/${film.id}-background.jpg')">
<div class="cinema-container">
<div class="cinema-hall first-hall" id="fh-${film.id}"></div>
</div>
</div>`;
