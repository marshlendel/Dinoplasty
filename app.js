const App = {
  init(selectors) {
    this.dinos = [];
    this.max = 0;
    this.list = document.querySelector(selectors.listSelector);
    this.template = document.querySelector(selectors.templateSelector);

    //Adding submit event listener to the form to run addDino when the app starts
    document
      .querySelector(selectors.formSelector)
      .addEventListener("submit", this.addDino.bind(this));
  },

  addDino(e) {
    e.preventDefault();
    const dino = {
      id: this.max + 1,
      name: e.target.dinoName.value,
    };

    this.renderListItem(dino);
    this.dinos.unshift(dino.name);
    this.saveDinos()
    this.max++;

    e.target.reset();
  },

  removeDino(e) {
    e.preventDefault();

    const li = e.target.closest(".dinoMem");
    if (
      li.nextElementSibling.classList.contains("template") &&
      li.previousElementSibling
    ) {
      li.previousElementSibling.classList.remove("border-bottom-0");
      li.previousElementSibling.classList.add("border-bottom");
    }

    this.dinos.splice(this.dinos.indexOf(li.firstElementChild.innerText), 1);
    li.remove();
  },

  saveDinos(){
    localStorage.setItem("dinos", JSON.stringify(this.dinos))
  },

  renderListItem(dino) {
    const li = this.template.cloneNode(true);
    li.classList.remove("template");
    li.classList.add("d-flex", "p-2", "align-items-center");

    document.querySelectorAll("li.dino")[1]
      ? li.classList.add("border", "border-secondary", "border-bottom-0")
      : li.classList.add("border", "border-secondary");

    li.dataset.id = dino.id;
    let dinoName = li.querySelector(".dino-name");
    dinoName.classList.add("flex-grow-1");
    dinoName.innerText = dino.name;

    li.querySelector("button.remove").addEventListener(
      "click",
      this.removeDino.bind(this)
    );
    this.list.prepend(li);
  },
};

App.init({
  formSelector: "#dino-form",
  listSelector: "#dino-list",
  templateSelector: ".dino.template",
});
