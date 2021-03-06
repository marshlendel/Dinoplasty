class App {
  constructor(selectors) {
    this.dinos = [];
    this.max = 0;
    this.list = document.querySelector(selectors.listSelector);
    this.template = document.querySelector(selectors.templateSelector);

    //Adding submit event listener to the form to run addDino when the app starts
    document
      .querySelector(selectors.formSelector)
      .addEventListener("submit", this.addDino.bind(this));

    this.loadDinos();
  }

  addDino(e) {
    e.preventDefault();
    const dino = {
      id: this.max + 1,
      name: e.target.dinoName.value,
      fav: false,
    };

    this.renderListItem(dino);
    this.dinos.unshift(dino);
    this.saveDinos(this.dinos);
    this.max++;

    e.target.reset();
  }

  removeDino(e) {
    const li = e.target.closest(".dino");
    if (
      li.nextElementSibling.classList.contains("template") &&
      li.previousElementSibling
    ) {
      li.previousElementSibling.classList.remove("border-bottom-0");
      li.previousElementSibling.classList.add("border-bottom");
    }

    this.dinos.forEach((obj, index) => {
      if (obj.id == li.dataset.id) {
        this.dinos.splice(index, 1);
        this.saveDinos(this.dinos);
      }
    });

    li.remove();
  }

  favDino(e) {
    e.currentTarget.classList.toggle("btn-primary");
    e.currentTarget.classList.toggle("btn-warning");
    const li = e.target.closest(".dino");
    li.classList.toggle("bg-warning");
    li.classList.toggle("border-secondary");
    li.classList.toggle("border-danger");
    this.dinos.forEach((obj) => {
      if (obj.id == li.dataset.id) {
        obj.fav == false ? (obj.fav = true) : (obj.fav = false);
        this.saveDinos(this.dinos);
      }
    });
  }

  moveUp(e) {
    const li = e.target.closest(".dino");
    const lastLi = this.list.lastElementChild.previousElementSibling;
    const previousLi = li.previousElementSibling;

    if (previousLi) {
      this.list.insertBefore(li, previousLi);

      this.dinos.forEach((obj, index) => {
        if (obj.id == li.dataset.id) {
          this.dinos.splice(index, 1);
          this.dinos.splice(index - 1, 0, obj);
          this.saveDinos(this.dinos);
        }
      });

      if (li === lastLi) {
        li.classList.add("border-bottom-0");
        previousLi.classList.remove("border-bottom-0");
      }
    }
  }

  moveDown(e) {
    const li = e.target.closest(".dino");
    const secondLast =
      this.list.lastElementChild.previousElementSibling.previousElementSibling;
    const nextLi = li.nextElementSibling;
    let object;
    let i;
    if (
      !li.nextElementSibling.classList.contains("template") &&
      li.nextElementSibling
    ) {
      this.list.insertBefore(li.nextElementSibling, li);
      this.dinos.forEach((obj, index) => {
        if (obj.id == li.dataset.id) {
          object = obj;
          i = index;
        }
      });
      this.dinos.splice(i, 1);
      this.dinos.splice(i + 1, 0, object);
      this.saveDinos(this.dinos);

      if (li === secondLast) {
        li.classList.remove("border-bottom-0");
        nextLi.classList.add("border-bottom-0");
      }
    }
  }

  edit(dino, e) {
    const li = e.target.closest(".dino");
    const dinoText = li.firstElementChild;
    const button = e.currentTarget;
    const icon = button.querySelector(".bi");
    button.classList.toggle("btn-primary");
    button.classList.toggle("btn-success");
    icon.classList.toggle("bi-pencil");
    icon.classList.toggle("bi-check-lg");

    if (dinoText.isContentEditable) {
      dinoText.contentEditable = false;
      dino.name = dinoText.innerText;
      this.saveDinos(this.dinos);
    } else {
      dinoText.contentEditable = true;

      dinoText.focus();
    }
  }

  saveOnEnter(dino, e) {
    const button = e.target.nextElementSibling.querySelector(".edit");
    const icon = button.querySelector(".bi");
    if (e.target.isContentEditable) {
      if (e.keyCode === 13) {
        button.classList.toggle("btn-success");
        button.classList.toggle("btn-primary");
        icon.classList.toggle("bi-pencil");
        icon.classList.toggle("bi-check-lg");
        e.target.contentEditable = false;
        dino.name = e.target.innerText;
        this.saveDinos(this.dinos);
      }
    }
  }

  saveDinos(dino) {
    localStorage.setItem("dinos", JSON.stringify(dino));
  }

  loadDinos() {
    const ids = [];
    const savedDinos = JSON.parse(localStorage.getItem("dinos"));
    if (savedDinos.length) {
      savedDinos.reverse().forEach((dinoObject) => {
        const dino = {
          name: dinoObject.name,
          id: dinoObject.id,
          fav: dinoObject.fav,
        };
        ids.push(dino.id);
        this.renderListItem(dino);
        this.dinos.unshift(dino);
      });
      const highId = Math.max(...ids);
      this.max = highId;
    }
  }

  renderListItem(dino) {
    const li = this.template.cloneNode(true);
    li.classList.remove("template");
    li.classList.add("d-flex", "p-2", "align-items-center");
    li.style.transition = "0.3s ease-in-out";

    document.querySelectorAll("li.dino")[1]
      ? li.classList.add("border", "border-secondary", "border-bottom-0")
      : li.classList.add("border", "border-secondary");

    if (dino.fav === true) {
      let button = li.querySelector(".fav");
      button.classList.toggle("btn-warning");
      li.classList.remove("border-secondary");
      li.classList.add("bg-warning", "border-danger");
    }

    li.dataset.id = dino.id;
    let dinoName = li.querySelector(".dino-name");
    dinoName.classList.add("flex-grow-1");
    dinoName.setAttribute("title", dino.name);
    dinoName.innerText = dino.name;

    li.querySelector("button.remove").addEventListener(
      "click",
      this.removeDino.bind(this)
    );

    li.querySelector("button.fav").addEventListener(
      "click",
      this.favDino.bind(this)
    );

    li.querySelector("button.up").addEventListener(
      "click",
      this.moveUp.bind(this)
    );

    li.querySelector("button.down").addEventListener(
      "click",
      this.moveDown.bind(this)
    );

    li.querySelector("button.edit").addEventListener(
      "click",
      this.edit.bind(this, dino)
    );

    li.querySelector(".dino-name").addEventListener(
      "keypress",
      this.saveOnEnter.bind(this, dino)
    );
    this.list.prepend(li);
  }
};

new App({
  formSelector: "#dino-form",
  listSelector: "#dino-list",
  templateSelector: ".dino.template",
});
