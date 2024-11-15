
const salas = [];

function addSalas(event) {
    event.preventDefault()
    const nomeSalas = document.getElementById('salas').value;

    if(nomeSalas.trim() !== ''){
        salas.push(nomeSalas);
        document.getElementById('salas').value = ''

        document.getElementById('salasArmazenado').value = JSON.stringify(salas);
        atualizarLista()
    }
}

function atualizarLista(){
    const lista = document.getElementById('listaSalas');
    lista.innerHTML = '';

    salas.forEach((e, i) => {
        const itens = document.createElement('li');
        itens.textContent = e;
        lista.appendChild(itens);
    })
}