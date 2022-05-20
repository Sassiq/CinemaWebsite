import { MainPage } from "./components/mainpage.js";
import { TicketsPage } from "./components/ticketspage.js";
import { FilmPage } from "./components/filmpage.js";
import { ProfilePage } from "./components/profilepage.js";

const featured = {
  name: "Snatch",
  id: "20",
  description:
    "The film shares themes, ideas, and motifs with Ritchie's first film, Lock, Stock and Two Smoking Barrels.",
};
const ticketsBackgroundImId = 19;
const profileBackgroundImId = 17;

const films = [
  { name: "Shrek", id: "1", description: "Shreks." },
  { name: "Star Wars", id: "2", description: "No chubakkas?" },
  { name: "1917", id: "4", description: "These descriptions..." },
  {
    name: "Avengers",
    id: "5",
    description:
      "American superhero film based on the Marvel Comics superhero team of the same name.",
  },
  {
    name: "Due Date",
    id: "10",
    description:
      "Due Date is a 2010 American black comedy road film directed by Todd Phillips, who wrote the screenplay with Alan R. Cohen, Alan Freedland.",
  },
];

const tickets = [{ filmName: "Avengers" }, { filmName: "1917" }];

var cinemaHall = {
  rows: [10, 20, 30, 30, 30, 30, 30, 30, 30, 30, 30],
};

function RenderMainPage() {
  document.getElementById("content").innerHTML = MainPage(films, featured);
  RenderFilms(films, featured);

  document.getElementById("films-btn").addEventListener("click", () => {
    document.getElementById("content").innerHTML = MainPage(films, featured);
    RenderFilms(films, featured);
  });

  document.getElementById("ticket-btn").addEventListener("click", () => {
    document.getElementById("content").innerHTML = TicketsPage(
      ticketsBackgroundImId,
      tickets
    );
  });

  document.getElementById("profile-btn").addEventListener("click", () => {
    document.getElementById("content").innerHTML = ProfilePage(
      profileBackgroundImId
    );
  });

  document.getElementById("logo-btn").addEventListener("click", () => {
    document.getElementById("content").innerHTML = MainPage(films, featured);
    RenderFilms(films, featured);
  });
}

function RenderFilms(films, featured) {
  document
    .getElementById(`${featured.id}-featured-btn`)
    .addEventListener("click", () => {
      document.getElementById("content").innerHTML = FilmPage(featured);
      RenderCinema(featured.id);
    });

  films.forEach((film) => {
    document.getElementById(`${film.id}-btn`).addEventListener("click", () => {
      document.getElementById("content").innerHTML = FilmPage(film);
      RenderCinema(film.id);
    });
  });

  const s = document.getElementById("fh");
  console.log(s);
}

function RenderCinema(id) {
  var cinemaHallMap = "";
  cinemaHall.rows.forEach((row) => {
    let cinemaHallRow = "";
    for (let i = 1; i <= +row; i++) {
      cinemaHallRow += `<div class="seat" data-row="${i}" data-seat="${i}">&nbsp;</div>`;
    }

    cinemaHallMap +=
      cinemaHallRow + '<div class="passage-between">&nbsp;</div>';
  });

  document.getElementById(`fh-${id}`).innerHTML = cinemaHallMap;
}

RenderMainPage();
