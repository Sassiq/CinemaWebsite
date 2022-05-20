export const TicketsPage = (background, tickets) =>
  `<div
  class="page-background"
  style="background: url('img/${background}.jpg')"
>
<div class="tickets-container">
<div class="tickets-header">My tickets</div>
<ul class="tickets-list">${tickets
    .map(
      (ticket) => `<li><a class="tickets-list-item">${ticket.filmName}</a></li>`
    )
    .join("")}
</div>
</div>
</div>`;
