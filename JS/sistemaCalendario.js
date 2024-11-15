
const calendarContainer = document.getElementById('calendar');
const sideBar = document.getElementById('sideBar');
const dataInput = document.getElementById('data');
const monthYearLabel = document.getElementById('monthYear');
const info = document.getElementById('info');
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
            console.log(data.data);
            info.innerHTML = `${data.nomeSindico} | ${data.nomeCondominio}`;
            createCalendar(anoRef, mesRef, data.data);
        })
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

        if (agendamento.includes(formated)) {
            dayButton.className = 'day-button-agendado'
            dayButton.disabled = true;
        }

        dayButton.textContent = day;
        dayButton.id = `day-${day}`;
        dayButton.onclick = () => {
            const formate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (!dayButton.disabled) {
                sideBar.className = 'sideBar';
                dataInput.value = formate;
            } else {
                alert('Você não pode agendar datas já passadas!');
            }
        };

        calendarContainer.appendChild(dayButton);
    }
}

function prevMonth() {
    mesRef--;
    if (mesRef < 0) {
        mesRef = 11;
        anoRef--;
    }

    if (!reqAgendados()) {
        createCalendar(anoRef, mesRef, []);
    } else {
        reqAgendados();
    }
}

function nextMonth() {
    mesRef++;
    if (mesRef > 11) {
        mesRef = 0;
        anoRef++;
    }
    if (!reqAgendados()) {
        createCalendar(anoRef, mesRef, []);
    } else {
        reqAgendados();
    }
}

function FecharSideBar() {
    sideBar.className = 'sideBarHidden';
}

if (!reqAgendados()) {
    createCalendar(anoRef, mesRef, []);
} else {
    reqAgendados();
}