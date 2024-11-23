const salas = [] // Array onde será colocado os dados!
 function add(event) {
    event.preventDefault() // Cancelar o onClick padrão de submit
    const lugar = document.getElementById(`sala`).value // Input do valor de salas
    salas.push(lugar) // Função para colocar os valores dentro do Array
    document.getElementById(`escondidinho`).value = JSON.stringify(salas) // Pega o input invisivel
    update() // Função de Atualizar
 }

 function update() {
    const lista = document.getElementById(`lista`) // Pega o span list
    lista.innerHTML = `` // Zera
    salas.forEach((a) => {
        const itens = document.createElement(`li`) // Cria um elemento <li>
        itens.textContent = a // Valor
        lista.appendChild(itens) // Coloca dentro de lista os elementos!
    })
 }