// Obtém elementos do DOM utilizados no script
const calendarContainer = document.getElementById('calendar'); // Contêiner do calendário
const sideBar = document.getElementById('sideBar'); // Sidebar para informações ou formulário
const sideBarContent = document.getElementById('sideBarContent'); // Conteúdo dinâmico da sidebar
const dataInput = document.getElementById('data'); // Input de data
const monthYearLabel = document.getElementById('monthYear'); // Label para exibição do mês e ano atual
const info = document.getElementById('info'); // Elemento para exibir informações gerais
const infoReserva = document.getElementById('informeReserva'); // Elemento para informar detalhes de reserva

// Define o ano e o mês de referência (inicialmente o ano e o mês atuais)
let anoRef = new Date().getFullYear();
let mesRef = new Date().getMonth();
const hoje = new Date(); // Data atual para validações

// Faz uma requisição para buscar a lista de salas
fetch('../PHP/listaDeSalas.php', {
    method: 'GET'
})
    .then(resposta => {
        if (!resposta.ok) { // Verifica se a resposta não é válida
            throw new Error('Erro de resposta do Servidor!');
        }
        return resposta.json(); // Converte a resposta para JSON
    })
    .then(dados => {
        if (dados.error) { // Verifica se houve erro nos dados retornados
            console.error(dados.error);
            alert('Erro ao carregar as salas: ', dados.error);
        } else {
            // Popula o seletor de salas com os dados recebidos
            const salas = dados;
            const selectInput = document.getElementById('salaSelect');

            selectInput.innerHTML = ''; // Limpa as opções atuais

            salas.forEach(e => {
                const options = document.createElement('option');
                options.value = e;
                options.textContent = e;
                selectInput.appendChild(options); // Adiciona cada sala como opção
            });
        }
    });

// Faz uma requisição para obter os agendamentos e atualiza o calendário
function reqAgendados() {
    fetch("../PHP/agendados.php", { method: 'GET' })
        .then(resposta => resposta.json()) // Converte a resposta para JSON
        .then(data => {
            console.log(data.agendamento); // Log dos agendamentos
            info.innerHTML = `${data.nomeSindico} | ${data.nomeCondominio}`; // Exibe informações gerais
            createCalendar(anoRef, mesRef, data.agendamento); // Cria o calendário com os agendamentos
        });
}

// Reseta a sidebar para seu estado inicial
function resetSidebar() {
    sideBar.classList.remove('sideBarHidden');
    sideBar.classList.add('sideBar');
    dataInput.value = ''; // Limpa o valor do input de data
}

// Cria o calendário dinamicamente com base no ano, mês e agendamentos
function createCalendar(year, month, agendamento) {
    calendarContainer.innerHTML = ''; // Limpa o calendário atual

    // Array com os nomes dos meses para exibição
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    monthYearLabel.textContent = `${monthNames[month]} de ${year}`; // Atualiza o título com o mês e ano

    const firstDay = new Date(year, month, 1).getDay(); // Dia da semana do primeiro dia do mês
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Número de dias no mês

    // Preenche os espaços em branco antes do primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarContainer.appendChild(emptyCell);
    }

    // Cria os botões para os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayButton = document.createElement('button');
        const buttonDate = new Date(year, month, day);
        const formated = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // Data formatada

        if (buttonDate < hoje) {
            // Botões de dias passados são desabilitados
            dayButton.className = 'day-button-invalid';
            dayButton.disabled = true;
        } else {
            dayButton.className = 'day-button'; // Botões de dias futuros
        }

        // Verifica se há agendamento para a data atual
        const agendamentos = agendamento.find(a => a.data === formated);
        if (agendamentos) {
            dayButton.className = 'day-button-agendado'; // Estiliza como agendado
            dayButton.onclick = () => showAgendamento(agendamentos); // Exibe detalhes do agendamento
        } else {
            // Exibe o formulário para criar um novo agendamento
            dayButton.onclick = () => {
                sideBar.className = 'sideBar';
                showForm(formated);
            };
        }

        dayButton.innerHTML = `<p class='dias'>${day}</p>`; // Exibe o número do dia
        dayButton.id = `day-${day}`; // Atribui um ID único ao botão
        calendarContainer.appendChild(dayButton); // Adiciona o botão ao calendário
    }
}

// Funções para alternar entre os meses
function prevMonth() {
    mesRef--;
    if (mesRef < 0) {
        mesRef = 11;
        anoRef--; // Volta para dezembro do ano anterior
    }
    reqAgendados();
}

function nextMonth() {
    mesRef++;
    if (mesRef > 11) {
        mesRef = 0;
        anoRef++; // Avança para janeiro do próximo ano
    }
    reqAgendados();
}

// Exibe os detalhes do agendamento na sidebar
function showAgendamento(agendamento) {
    const dataISO = agendamento.data;
    const [ano, mes, dia] = dataISO.split('-');

    sideBar.className = 'sideBar';
    const content = `
        <h3>Agendamento para ${dia + '/' + mes + '/' + ano}</h3>
        <p><strong>Nome:</strong> ${agendamento.nomeResponsavel}</p>
        <p><strong>Hora Inicio:</strong> ${agendamento.horaInicio}</p>
        <p><strong>Hora Fim:</strong> ${agendamento.horaFim}</p>
        <p><strong>Sala Reservada:</strong> ${agendamento.sala}</p>
    `;
    sideBarContent.innerHTML = content;
}

// Exibe o formulário para criar um novo agendamento
function showForm(dataAgendamento) {
    const formContent = `
        <label for="nomeResponsavel" style="display: flex; flex-direction: column;">
                    <p>Nome do Responsável:</p>
                    <input name="nomeResponsavel" id="nomeResponsavel" type="text">
                </label>
                
                <label for="salaSelect" style="display: flex; flex-direction: column;">
                    <p>Sala de Reserva:</p>
                    <select name="salaSelect" id="salaSelect">
                    </select>
                </label>
                <label for="horaInicio" style="display: flex; flex-direction: column;">
                    <p>Horário de Início:</p>
                    <input name="horaInicio" id="horaInicio" type="time">
                </label>
                <label for="horaFim" style="display: flex; flex-direction: column;">
                    <p>Horário de Fim:</p>
                    <input name="horaFim" id="horaFim" type="time">
                </label>
                <label for="data" style="display: flex; flex-direction: column;">
                    <p>Data:</p>
                    <input name="data" value="${dataAgendamento}" id="data" type="date">
                </label>
                <button type="submit" class="btn btn-primary">Agendar</button>
    `;
    sideBarContent.innerHTML = formContent;
    updateSalaSelect(); // Atualiza o seletor de salas
}

// Atualiza o seletor de salas com dados do servidor
function updateSalaSelect() {
    fetch('../PHP/listaDeSalas.php', { method: 'GET' })
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error('Erro de resposta do Servidor!');
            }
            return resposta.json();
        })
        .then(dados => {
            const salas = dados;
            const selectInput = document.getElementById('salaSelect');
            selectInput.innerHTML = ''; // Limpa as opções
            salas.forEach(e => {
                const options = document.createElement('option');
                options.value = e;
                options.textContent = e;
                selectInput.appendChild(options);
            });
        });
}

// Fecha a sidebar e limpa seu conteúdo
function FecharSideBar() {
    sideBar.className = 'sideBarHidden';
    sideBarContent.innerHTML = '';
    dataInput.value = '';
}

// Inicializa o calendário ao carregar a página
async function inicializar() {
    const agendamentos = await reqAgendados(); // Obtém agendamentos do servidor
    createCalendar(anoRef, mesRef, agendamentos ? agendamentos.data : []); // Cria o calendário
}

inicializar(); // Executa a inicialização
