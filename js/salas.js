const salas = []
 function add(event) {
    event.preventDefault()
    const lugar = document.getElementById(`sala`).value
    salas.push(lugar)
    document.getElementById(`escondidinho`).value = JSON.stringify(salas)
    update()
 }

 function update() {
    const lista = document.getElementById(`lista`)
    lista.innerHTML = ``
    salas.forEach((a) => {
        const itens = document.createElement(`li`)
        itens.textContent = a
        lista.appendChild(itens)
    })
 }