// Declara um array vazio para armazenar as salas
const salas = [];

// Função que adiciona salas ao array e atualiza a lista na tela
function addSalas(event) {
    event.preventDefault();  // Impede o envio do formulário (se houver)
    
    const nomeSalas = document.getElementById('salas').value;  // Recupera o valor inserido no campo de texto com id 'salas'

    if(nomeSalas.trim() !== ''){  // Verifica se o valor não está vazio ou contém apenas espaços
        salas.push(nomeSalas);  // Adiciona o nome da sala ao array 'salas'
        document.getElementById('salas').value = '';  // Limpa o campo de texto 'salas' após adicionar o valor

        // Converte o array 'salas' em uma string JSON e armazena no campo 'salasArmazenado'
        document.getElementById('salasArmazenado').value = JSON.stringify(salas);
        
        atualizarLista();  // Chama a função para atualizar a lista de salas exibida
    }
}

// Função que atualiza a lista de salas exibida na tela
function atualizarLista(){
    const lista = document.getElementById('listaSalas');  // Obtém o elemento da lista com id 'listaSalas'
    lista.innerHTML = '';  // Limpa a lista atual

    // Percorre o array 'salas' e cria um item de lista (<li>) para cada sala
    salas.forEach((e, i) => {
        const itens = document.createElement('li');  // Cria um novo item de lista
        itens.textContent = e;  // Define o texto do item de lista como o nome da sala
        lista.appendChild(itens);  // Adiciona o item à lista
    })
}
