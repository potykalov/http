import HelpDesk from "./HelpDesk/HelpDesk.js";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.querySelector(".container");

  const helpDesk = new HelpDesk(rootEl);

  helpDesk.init();
});

// const xhr = new XMLHttpRequest();

// xhr.open("GET", "http://localhost:7070?method=allTickets");

// xhr.send();
