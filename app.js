const App = {

    init(formSelector){ 
        this.max = 0;
        document
        .querySelector(formSelector)
        .addEventListener("submit", this.addDino.bind(this))
    },

    addDino(e){
        e.preventDefault()

        const dino = {
            id: this.max + 1,
            name:  e.target.dinoName.value,

        }

        console.log(dino.name, dino.id)
        this.max ++
    }
}

App.init("#dinoForm")