export default class Module {
  #element;
  #formEl;
  #titleEl;
  #labelEl;
  #inputEl;
  #descriptionLabelEl;
  #descriptionFieldEl;
  #buttonsWrapper;
  #submitButton;
  #cancelButton;
  #onSubmit;

  constructor() {
    this.#element = this.create();

    document.body.append(this.#element);

    this.#element.addEventListener("click", this.onBtn);
  }

  openAddTicket(onSubmit) {
    this.#onSubmit = onSubmit;

    this.clear();

    const titleEl = this.createTitle();
    const formEl = this.createForm();
    const actionsEl = this.createButtons();
    const nameEl = this.createName();
    const descriptionEl = this.createDescription();

    formEl.append(nameEl, descriptionEl, actionsEl);

    this.#element.append(titleEl, formEl);

    this.open();
  }

  openEditTicket({ name, description }, onSubmit) {
    this.#onSubmit = onSubmit;

    this.clear();

    const titleEl = this.createTitle();
    const formEl = this.createForm();
    const actionsEl = this.createButtons();
    const nameEl = this.createName();
    const descriptionEl = this.createDescription();

    titleEl.textContent = "Изменить тикет";

    nameEl.children[0].value = name;
    descriptionEl.children[0].value = description;

    formEl.append(nameEl, descriptionEl, actionsEl);

    this.#element.append(titleEl, formEl);

    this.open();
  }

  openSubmitTicket(onSubmit) {
    this.#onSubmit = onSubmit;

    this.clear();

    const titleEl = this.createTitle();
    titleEl.textContent = "Удалить тикет";

    const paragraphEl = this.createParagraph();
    paragraphEl.textContent =
      "Вы уверены, что хотите удалить тикет? Это действие не обратимо.";

    const actionsEl = this.createButtons("button", "delete");

    this.#element.append(titleEl, paragraphEl, actionsEl);

    this.open();
  }

  create() {
    const element = document.createElement("dialog");
    element.className = "modal";

    return element;
  }

  createForm() {
    this.#formEl = document.createElement("form");
    this.#formEl.className = "modal__form";

    this.#formEl.addEventListener("submit", this.onSubmitForm);

    return this.#formEl;
  }

  createParagraph() {
    return document.createElement("p");
  }

  createTitle() {
    this.#titleEl = document.createElement("h2");
    this.#titleEl.textContent = "Добавить тикет";
    this.#titleEl.className = "modal__header";

    return this.#titleEl;
  }

  createName() {
    this.#labelEl = document.createElement("label");
    this.#labelEl.textContent = "Краткое описание";
    this.#labelEl.className = "modal__label";
    this.#inputEl = document.createElement("input");
    this.#inputEl.className = "modal__field";
    this.#inputEl.required = true;

    this.#labelEl.append(this.#inputEl);

    return this.#labelEl;
  }

  createDescription() {
    this.#descriptionLabelEl = document.createElement("label");
    this.#descriptionLabelEl.textContent = "Подробное описание";
    this.#descriptionLabelEl.className = "modal__label";

    this.#descriptionFieldEl = document.createElement("textarea");
    this.#descriptionFieldEl.className = "modal__textarea";

    this.#descriptionLabelEl.append(this.#descriptionFieldEl);

    return this.#descriptionLabelEl;
  }

  createButtons(type = "submit", action = "submit") {
    this.#buttonsWrapper = document.createElement("div");
    this.#buttonsWrapper.className = "modal__buttons-wrapper";

    this.#submitButton = document.createElement("button");
    this.#submitButton.textContent = "ОК";
    this.#submitButton.className = "btn";

    this.#submitButton.type = type;
    this.#submitButton.dataset.action = action;

    this.#cancelButton = document.createElement("button");
    this.#cancelButton.type = "button";
    this.#cancelButton.textContent = "Отмена";
    this.#cancelButton.className = "btn";
    this.#cancelButton.dataset.action = "close";

    this.#buttonsWrapper.append(this.#cancelButton, this.#submitButton);

    return this.#buttonsWrapper;
  }

  open() {
    this.#element.showModal();
  }

  close() {
    this.#element.close();

    this.clear();
  }

  clear() {
    this.#element.innerHTML = "";
  }

  onSubmitForm = (e) => {
    e.preventDefault();

    const name = this.#inputEl.value.trim();
    const description = this.#descriptionFieldEl.value.trim();

    if (!name) return;

    const data = { name, description };

    if (this.#onSubmit) {
      this.#onSubmit(data);
    }

    this.#formEl.reset();

    this.close();
  };

  onBtn = (e) => {
    const button = e.target.closest("[data-action]");

    if (!button) return;

    if (button.dataset.action === "close") {
      this.close();
    }

    if (button.dataset.action === "delete") {
      this.#onSubmit?.();
      this.close();
    }
  };
}
