//Pegando a div que vai criar o calendário dentro.
const divCalendario = document.getElementById('calendar');
//Pegando o span que vai colocar o textin, novembro, janeiro etc...
const diaMesDisplay = document.getElementById('monthYear');
let anoAtual = new Date().getFullYear();
let mesAtual = new Date().getMonth();
const diaDeHoje = new Date();

function criarCalendario(ano,mes){
    divCalendario.innerHTML = '';
    const nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    //Colocando pra aparecer o textin, 28 de novembro por exemplo lá no site.
    diaMesDisplay.textContent = `${nomeMeses[mes]} de ${ano}`;
    
    //Obtendo em dia o primeiro dia da semana começa, se é numa terça quarta.
    const primeiroDia = new Date(ano, mes, 1).getDay();

    //Obtendo a quantidade de dias no mês, no caso ele retorna o qual é o último dia do mês, mas já serve.
    const diasNoMes = new Date(ano, mes + 1,0).getDate();

    //Se a semana começar numa sexta ele vai colocar divs vazias até chegar na coluna da sexta.
    for(let i = 0; i < primeiroDia; i++){
        const celulaVazia = document.createElement('div');
        divCalendario.appendChild(celulaVazia);
    }

    //For para colocar os botões dentro da div calendar.
    for(let dia = 1; dia <= diasNoMes; dia++){
        const botaoDia = document.createElement('button');
        const dataBotao = new Date(ano, mes, dia);

        //Se a dataBotao tiver data menor que a data do dia de hoje, ele deixa o botão com uma classe diferente e desativado.
        if(dataBotao < diaDeHoje){
            botaoDia.className = 'dia-botao-invalido';
            botaoDia.disabled = true;
        }else{
            //Se não ele fica com uma classe normal.
            botaoDia.className = 'dia-botao-valido';
        }

        botaoDia.textContent = dia;

        //Colocando o id de cada botão
        botaoDia.id = `dia-${dia}`;

        //Adicionando o botão de cada loop na div calendar.
        divCalendario.appendChild(botaoDia);
        
    }
    
}
//Quando ele clicar em anterior lá no site ele executa essa função, que diminui o mesAtual e cria denovo o calendário e se o mes for menor que 0, ele diminiu o ano também.
function mesAnterior(){
    mesAtual--;
    if(mesAtual < 0){
        mesAtual = 11;
        anoAtual--;
    }
    criarCalendario(anoAtual,mesAtual);
}

//Quando ele clicar em próximo lá no site ele executa essa função, que aumenta o mesAtual e cria denovo o calendário e se o mes for maior que 11 (o índice 11 representa dezembro), ele aumenta o ano também.
function mesProximo(){
    mesAtual++;
    if(mesAtual > 11){
        mesAtual = 0;
        anoAtual++;
    }
    criarCalendario(anoAtual,mesAtual);
}

//Ele cria o calendário pela primeira vez para começar.
criarCalendario(anoAtual,mesAtual);