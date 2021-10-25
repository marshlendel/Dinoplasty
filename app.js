const App = {
  init(selectors) {
    this.dinos = [];
    this.max = 0;
    this.list = document.querySelector(selectors.listSelector);
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
    console.log(this.dinos);
    this.max++;

    e.target.reset();
  },

  renderListItem(dino) {
    const li = document.createElement("li");
    li.innerText = dino.name;
    li.dataset.id = dino.id;
    this.list.prepend(li);
  },
};

App.init({
  formSelector: "#dino-form",
  listSelector: "#dino-list",
});
