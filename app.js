const App = {
  init(selectors) {
    this.dinos = [];
    this.max = 0;
    this.list = document.querySelector(selectors.listSelector);
    this.template = document.querySelector(selectors.templateSelector)

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
    this.max++;

    e.target.reset();
  },

  renderListItem(dino) {
    const li = this.template.cloneNode(true);
    li.classList.remove("template")
    li.dataset.id = dino.id;
    li.querySelector(".dino-name").innerText = dino.name
    this.list.prepend(li);
  },
};

App.init({
  formSelector: "#dino-form",
  listSelector: "#dino-list",
  templateSelector: ".dino.template"
});
