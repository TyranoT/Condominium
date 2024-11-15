
const calendarContainer = document.getElementById('calendar');
const sideBar = document.getElementById('sideBar');
const sideBarContent = document.getElementById('sideBarContent')
const dataInput = document.getElementById('data');
const monthYearLabel = document.getElementById('monthYear');
const info = document.getElementById('info');
const infoReserva = document.getElementById('informeReserva');
let anoRef = new Date().getFullYear();
let mesRef = new Date().getMonth();
const hoje = new Date();

fetch(
    '../PHP/listaDeSalas.php', {
    method: 'GET'
})
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error('Erro de resposa do Servidor!')
        }
        return resposta.json();
    })
    .then(dados => {
        if (dados.error) {
            console.error(dados.error);
            alert('Erro ao carregar as salas: ', dados.error);
        } else {
            const salas = dados;
            const selectInput = document.getElementById('salaSelect');

            selectInput.innerHTML = '';

            salas.forEach(e => {
                const options = document.createElement('option');
                options.value = e;
                options.textContent = e;
                selectInput.appendChild(options);
            })
        }
    })

function reqAgendados() {
    fetch(
        "../PHP/agendados.php",
        {
            method: 'GET'
        })
        .then(resposta => resposta.json())
        .then(data => {
            console.log(data.agendamento);
            info.innerHTML = `${data.nomeSindico} | ${data.nomeCondominio}`;
            createCalendar(anoRef, mesRef, data.agendamento);
        })
}

function resetSidebar() {
    sideBar.classList.remove('sideBarHidden');
    sideBar.classList.add('sideBar');
    dataInput.value = '';
}

function createCalendar(year, month, agendamento) {
    calendarContainer.innerHTML = '';

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    monthYearLabel.textContent = `${monthNames[month]} de ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarContainer.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayButton = document.createElement('button');
        const buttonDate = new Date(year, month, day);
        const formated = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        if (buttonDate < hoje) {
            dayButton.className = 'day-button-invalid';
            dayButton.disabled = true;
        } else {
            dayButton.className = 'day-button';
        }

        const agendamentos = agendamento.find(a => a.data === formated);
        if (agendamentos) {
            dayButton.className = 'day-button-agendado';
            dayButton.onclick = () => showAgendamento(agendamentos);
        } else {
            dayButton.onclick = () => {
                sideBar.className = 'sideBar';
                dataInput.value = formated;
                showForm()
            };
        }

        dayButton.innerHTML = `<p class='dias'>${day}</p>`;
        dayButton.id = `day-${day}`;
        calendarContainer.appendChild(dayButton);
    }
}

function prevMonth() {
    mesRef--;
    if (mesRef < 0) {
        mesRef = 11;
        anoRef--;
    }

    reqAgendados();
}

function nextMonth() {
    mesRef++;
    if (mesRef > 11) {
        mesRef = 0;
        anoRef++;
    }
    reqAgendados();
}

function showAgendamento(agendamento) {
    const dataISO = agendamento.data;
    const [ano, mes, dia] = dataISO.split('-');

    sideBar.className = 'sideBar';
    const content = `
        <h3>Agendamento para ${dia+'/'+mes+'/'+ano}</h3>
        <p><strong>Nome:</strong> ${agendamento.nomeResponsavel}</p>
        <p><strong>Hora Inicio:</strong> ${agendamento.horaInicio}</p>
        <p><strong>Hora Fim:</strong> ${agendamento.horaFim}</p>
        <p><strong>Sala Reservada:</strong> ${agendamento.sala}</p>
    `;
    sideBarContent.innerHTML = content;
}

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
    `;
    sideBarContent.innerHTML = formContent;
    updateSalaSelect();
}

function updateSalaSelect() {
    fetch(
        '../PHP/listaDeSalas.php', {
        method: 'GET'
    })
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error('Erro de resposta do Servidor!');
            }
            return resposta.json();
        })
        .then(dados => {
            if (dados.error) {
                console.error(dados.error);
                alert('Erro ao carregar as salas: ', dados.error);
            } else {
                const salas = dados;
                const selectInput = document.getElementById('salaSelect');

                selectInput.innerHTML = '';

                salas.forEach(e => {
                    const options = document.createElement('option');
                    options.value = e;
                    options.textContent = e;
                    selectInput.appendChild(options);
                });
            }
        });
}

function FecharSideBar() {
    sideBar.className = 'sideBarHidden';
    sideBarContent.innerHTML = '';
    dataInput.value = '';
}

async function inicializar() {
    const agendamentos = await reqAgendados();
    createCalendar(anoRef, mesRef, agendamentos ? agendamentos.data : []);
}

inicializar();