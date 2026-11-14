import pencilIcon from "../../img/pencil-icon.svg";

export default class Task {
  #taskEl;
  #name;
  #id;
  #status;
  #created;
  #module;
  #onEdit;
  #onGetTicket;
  #deleteById;
  #updateById;
  #ticketById;
  #description = null;

  constructor(
    { name, id, status, created },
    module,
    onEdit,
    onGetTicket,
    deleteById,
    updateById,
    ticketById,
  ) {
    this.#name = name;
    this.#id = id;
    this.#status = status;
    this.#created = created;

    this.#module = module;
    this.#onEdit = onEdit;
    this.#onGetTicket = onGetTicket;
    this.#deleteById = deleteById;
    this.#updateById = updateById;
    this.#ticketById = ticketById;
  }

  create() {
    this.#taskEl = document.createElement("div");
    this.#taskEl.className = "task";
    this.#taskEl.dataset.id = this.#id;

    const taskWrapperLeftEl = document.createElement("div");
    taskWrapperLeftEl.className = "task__wrapper-left";

    const taskCustomCheckboxEl = document.createElement("div");
    taskCustomCheckboxEl.className = "task__custom-checkbox";

    const taskCheckboxEl = document.createElement("input");
    taskCheckboxEl.className = "task__checkbox";
    taskCheckboxEl.type = "checkbox";
    taskCheckboxEl.id = this.#id;
    taskCheckboxEl.checked = this.#status;

    const taskLabelEl = document.createElement("label");
    taskLabelEl.className = "task__label";
    taskLabelEl.htmlFor = this.#id;

    const taskTitle = document.createElement("span");
    taskTitle.className = "task__title";
    taskTitle.textContent = this.#name;

    const taskWrapperRight = document.createElement("div");
    taskWrapperRight.className = "task__wrapper-right";

    const date = new Intl.DateTimeFormat("ru-Ru", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      timeZone: "Europe/Moscow",
    }).format(this.#created);
    const taskCreatedEl = document.createElement("time");
    taskCreatedEl.className = "task__created";
    taskCreatedEl.textContent = date;

    const taskBtnWrapper = document.createElement("div");
    taskBtnWrapper.className = "task__btn-wrapper";

    const taskBtnEdit = document.createElement("button");
    taskBtnEdit.type = "button";
    taskBtnEdit.className = "task__btn";

    taskBtnEdit.addEventListener("click", (e) => {
      e.stopPropagation();
      this.#onGetTicket(this.#id, (data) => {
        this.#module.openEditTicket(data, (formData) => {
          this.#onEdit({
            ...formData,
            id: this.#id,
          });
        });
      });
    });

    const imageEdit = document.createElement("img");
    imageEdit.className = "task__icon-btn";
    imageEdit.src = pencilIcon;

    const taskBtnRemove = document.createElement("button");
    taskBtnRemove.type = "button";
    taskBtnRemove.className = "task__btn";
    taskBtnRemove.textContent = "X";

    taskBtnRemove.addEventListener("click", (e) => {
      e.stopPropagation();

      this.#module.openSubmitTicket(() => {
        this.#deleteById(this.#id);
      });
    });

    taskBtnEdit.append(imageEdit);

    taskCustomCheckboxEl.append(taskCheckboxEl, taskLabelEl);

    taskLabelEl.append(taskTitle);

    taskWrapperLeftEl.append(taskCustomCheckboxEl);

    taskBtnWrapper.append(taskBtnEdit, taskBtnRemove);

    taskWrapperRight.append(taskCreatedEl, taskBtnWrapper);

    this.#taskEl.append(taskWrapperLeftEl, taskWrapperRight);

    taskCheckboxEl.addEventListener("change", (e) => {
      const data = {
        status: e.currentTarget.checked,
        id: this.#id,
      };

      this.#updateById(data);
    });

    taskCheckboxEl.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    taskLabelEl.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    this.#taskEl.addEventListener("click", this.onClickTask);

    return this.#taskEl;
  }

  onClickTask = () => {
    this.#ticketById(this.#id, (data) => {
      const taskWrapperLeftEl = this.#taskEl.querySelector(
        ".task__wrapper-left",
      );

      if (!this.#description) {
        this.#description = document.createElement("span");
        this.#description.textContent = data.description;

        taskWrapperLeftEl.append(this.#description);

        return;
      }

      this.#description.remove();
      this.#description = null;
    });
  };
}
