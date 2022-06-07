export const ticketsPage = (background, tickets) =>
  `<div
  class="page-background"
  style="background: url('img/${background}.jpg')"
>
<div class="tickets-container">
<div class="tickets-header">My tickets</div>
<ul class="tickets-list">${tickets
    .map(
      (ticket) =>
        `<li><a class="tickets-list-item">${ticket.film} - ${ticket.row} row, place ${ticket.column}</a></li>`
    )
    .join("")}
</div>
</div>
</div>`;
