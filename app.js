const App = {

    init(selectors){ 
        this.max = 0;
        this.list = document.querySelector(selectors.listSelector)
        document
        .querySelector(selectors.formSelector)
        .addEventListener("submit", this.addDino.bind(this))
    },

    addDino(e){
        e.preventDefault()

        const dino = {
            id: this.max + 1,
            name:  e.target.dinoName.value,

        }

        this.renderListItem(dino)
        this.max ++
    },

    renderListItem(dino){
        const li = document.createElement("li")
        li.innerText = dino.name
        this.list.appendChild(li)
    }
}

App.init({
    formSelector: "#dino-form",
    listSelector: "#dino-list"
})