import { mainPage } from "./components/mainpage.js";
import { ticketsPage } from "./components/ticketspage.js";
import { filmPage } from "./components/filmpage.js";
import { profilePage } from "./components/profilepage.js";
import { errorPage } from "./components/errorpage.js";

import "./styles/cinema.css";
import "./styles/profile.css";
import "./styles/tickets.css";
import "./style.css";
import {
  monitorAuthState,
  redirectGoogleSignUp,
  signInWithEmail,
  signUpWithEmail,
  signOutFromApp,
  fetchData,
  backUpData,
} from "./api.js";

const featured = {
  name: "Snatch",
  id: "20",
  description:
    "The film shares themes, ideas, and motifs with Ritchie's first film, Lock, Stock and Two Smoking Barrels.",
};

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
  {
    name: "Hobbit",
    id: "7",
    description:
      "Bilbo Baggins lives a quiet, peaceful life in his comfortable hole at Bag End.",
  },
  {
    name: "Shutter Island",
    id: "6",
    description:
      "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.",
  },
];

const profileBackgroundImId = 17;
const ticketsBackgroundImId = 19;
const userCollectionName = "users";
const filmsInfoCollectionName = "films";

let user = { name: "", isSignedIn: false, tickets: [] };
let currentFilmSoldTickets = [];

const setCurrentFilmSoldTickets = (newValue) => {
  if (newValue == null) {
    currentFilmSoldTickets = [];
    return;
  }
  currentFilmSoldTickets = JSON.parse(JSON.stringify(newValue));
};

const setUserTickets = (data) => {
  user.tickets = JSON.parse(JSON.stringify(data));
};

function renderMainPage() {
  renderFilms(films, featured);

  document.getElementById("films-btn").addEventListener("click", () => {
    renderFilms(films, featured);
  });

  document.getElementById("logo-btn").addEventListener("click", () => {
    renderFilms(films, featured);
  });

  document.getElementById("ticket-btn").addEventListener("click", () => {
    renderTickets(ticketsBackgroundImId);
  });

  document.getElementById("profile-btn").addEventListener("click", (event) => {
    renderProfile(event);
  });
}

function renderTickets(imageId) {
  if (!user.isSignedIn) {
    document.getElementById("content").innerHTML = errorPage();
    return;
  }

  document.getElementById("content").innerHTML = ticketsPage(
    imageId,
    user.tickets
  );
}

function renderProfile(event) {
  if (event.target.innerHTML == "Log Out") {
    signOutFromApp();
    alert("Successfully logged out.");
  } else {
    document.getElementById("content").innerHTML = profilePage(
      profileBackgroundImId
    );

    const email = document.getElementById("name");
    const password = document.getElementById("password");

    document
      .getElementById("login-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        signInWithEmail(email.value, password.value);
      });

    document
      .getElementById("register-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        signUpWithEmail(email.value, password.value);
      });

    document.getElementById("signin-google").addEventListener("click", () => {
      redirectGoogleSignUp();
    });
  }
}

function makeArrowClickable() {
  const movieList = document.querySelector(".movie-list");
  const arrow = document.querySelector(".arrow");
  const itemNumber = movieList.querySelectorAll("img").length;
  let clickCounter = 0;

  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;

    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieList.style.transform = `translateX(${
        movieList.computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieList.style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });
}

function renderFilms(films, featured) {
  document.getElementById("content").innerHTML = mainPage(films, featured);
  makeArrowClickable();
  document
    .getElementById(`${featured.id}-featured-btn`)
    .addEventListener("click", async (event) => {
      document.getElementById("content").innerHTML = filmPage(featured);
      await renderCinema(featured);
    });

  films.forEach((film) => {
    document
      .getElementById(`${film.id}-btn`)
      .addEventListener("click", async (event) => {
        document.getElementById("content").innerHTML = filmPage(film);
        await renderCinema(film);
      });
  });
}

async function renderCinema(film) {
  if (!user.isSignedIn) {
    document.getElementById("content").innerHTML = errorPage();
    return;
  }

  let cinemaHall = {
    rows: [10, 20, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  };

  await fetchData(user.id, userCollectionName, setUserTickets);
  await fetchData(film.id, filmsInfoCollectionName, setCurrentFilmSoldTickets);

  let cinemaHallMap = "";
  cinemaHall.rows.forEach((row, index) => {
    let cinemaHallRow = "";
    for (let i = 1; i <= +row; i++) {
      cinemaHallRow += `<div class="seat ${
        currentFilmSoldTickets.some(
          (seat) => seat.row === index && seat.column === i
        )
          ? user.tickets.some((seat) => seat.row === index && seat.column === i)
            ? "bought"
            : "seat-taken"
          : ""
      }" data-row="${index}" data-column="${i}">&nbsp;</div>`;
    }

    cinemaHallMap +=
      cinemaHallRow + '<div class="passage-between">&nbsp;</div>';
  });

  document.getElementById(`fh-${film.id}`).innerHTML = cinemaHallMap;
  makeSeatsClickable(film);
}

function makeSeatsClickable(film) {
  [...document.querySelectorAll(".seat")]
    .filter((item) => ![...item.classList].includes("seat-taken"))
    .forEach((seat) => {
      seat.addEventListener("click", (event) => {
        event.currentTarget.classList.toggle("bought");
        const ticket = {
          film: film.name,
          row: +event.currentTarget.getAttribute("data-row"),
          column: +event.currentTarget.getAttribute("data-column"),
        };

        if (
          currentFilmSoldTickets.some(
            (seat) => seat.row === ticket.row && seat.column === ticket.column
          )
        ) {
          user.tickets.splice(
            user.tickets.findIndex(
              (seat) => seat.row === ticket.row && seat.column === ticket.column
            ),
            1
          );

          currentFilmSoldTickets.splice(
            currentFilmSoldTickets.findIndex(
              (seat) => seat.row === ticket.row && seat.column === ticket.column
            ),
            1
          );
        } else {
          currentFilmSoldTickets.push(ticket);
          user.tickets.push(ticket);
        }

        backUpData(film.id, filmsInfoCollectionName, currentFilmSoldTickets);
        backUpData(user.id, userCollectionName, user.tickets);
      });
    });
}

monitorAuthState((newValue) => {
  user = newValue;
  if (newValue.isSignedIn) {
    document.getElementById("profile-btn").innerHTML = "Log Out";
  } else {
    document.getElementById("profile-btn").innerHTML = "Log In";
  }
});

renderMainPage();
