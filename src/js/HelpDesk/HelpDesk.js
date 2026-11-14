import Task from "../Task/Task.js";
import Module from "../Module/Module.js";

export default class HelpDesk {
  #root;
  #helpdeskListEl;
  #module;
  #helpdeskAddTicketEl;

  constructor(root) {
    this.#root = root;
  }

  init() {
    const helpdeskEl = document.createElement("div");
    helpdeskEl.className = "helpdesk";

    this.#helpdeskAddTicketEl = document.createElement("button");
    this.#helpdeskAddTicketEl.className = "helpdesk__add-ticket";
    this.#helpdeskAddTicketEl.textContent = "Добавить тикет";
    this.#helpdeskAddTicketEl.type = "button";

    this.#helpdeskAddTicketEl.addEventListener("click", this.onOpenAddTask);

    this.#helpdeskListEl = document.createElement("ul");
    this.#helpdeskListEl.className = "helpdesk__list";

    helpdeskEl.append(this.#helpdeskAddTicketEl, this.#helpdeskListEl);
    this.#root.append(helpdeskEl);

    this.#module = new Module(this.deleteById);
    this.getTasks();
  }

  getTasks() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:7070?method=allTickets");

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);

          this.renderTasks(data);
        } catch (e) {
          console.error(e);
        }
      }
    });

    xhr.send();
  }

  renderTasks(tasks) {
    this.#helpdeskListEl.innerHTML = "";

    tasks.forEach((task) => {
      const itemEl = document.createElement("li");
      itemEl.className = "helpdesk__list-item";
      itemEl.dataset.id = task.id;

      const element = new Task(
        task,
        this.#module,
        (data) => this.updateById(data),
        (id, callback) => this.ticketById(id, callback),
        (id) => this.deleteById(id),
        (data) => this.updateById(data),
        (id, callback) => this.ticketById(id, callback),
      );
      const taskEl = element.create();

      itemEl.append(taskEl);

      this.#helpdeskListEl.append(itemEl);
    });
  }

  onOpenAddTask = () => {
    this.#module.openAddTicket((data) => {
      this.createTicket(data);
    });
  };

  createTicket(data) {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:7070?method=createTicket");

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        this.getTasks();
      }
    });

    xhr.send(JSON.stringify(data));
  }

  ticketById(id, callback) {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `http://localhost:7070?method=ticketById&id=${id}`);

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);

        callback(data);
      }
    });

    xhr.send();
  }

  updateById(data) {
    const xhr = new XMLHttpRequest();

    xhr.open(
      "POST",
      `http://localhost:7070?method=updateById&id=${encodeURIComponent(data.id)}`,
    );

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        this.getTasks();
      }
    });

    xhr.send(JSON.stringify(data));
  }

  deleteById(id) {
    const xhr = new XMLHttpRequest();

    xhr.open(
      "GET",
      `http://localhost:7070?method=deleteById&id=${encodeURIComponent(id)}`,
    );

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        this.getTasks();
      }
    });

    xhr.send();
  }
}
