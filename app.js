const App = {
    init(formSelector){
        document
        .querySelector(formSelector)
        .addEventListener("submit", this.addDino)
    },
    addDino(e){
        e.preventDefault()
        const dinoName = e.target.dinoName.value
        console.log(dinoName)
    }
}

App.init("#dinoForm")