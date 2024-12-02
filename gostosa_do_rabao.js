const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');

// Configuração do contador
const startPauseBt = document.querySelector('#start-pause');
let tempoDecorridoEmSegundos = 10; // Alterado para 10 segundos
let intervaloId = null;
let beepIntervalId = null; // Adicionado para controlar o som de alerta intermitente

// Esconde o elemento do temporizador inicialmente
const timer = document.querySelector('#timer'); 
timer.style.display = 'none';

// Toque da Música
const musicaFocoInput = document.querySelector('#alternar-musica'); 
const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;
musicaFocoInput.addEventListener('change', () => { 
    if (musica.paused) { 
        musica.play(); 
    } else { 
        musica.pause(); 
    } 
});

// Ajuste para selecionar o elemento de áudio corretamente
const musicaPlay = document.getElementById('musica-play');
const musicaPause = document.getElementById('musica-pause');
const musicaBeep = document.getElementById('musica-beep'); // Seleciona o elemento de áudio para o som de alerta

// Verificação do volume
musicaPlay.volume = 1.0; // Ajusta o volume para 100%
musicaPause.volume = 1.0; // Ajusta o volume para 100%
musicaBeep.volume = 1.0; // Ajusta o volume para 100%

// Verificação se o áudio está pronto para reprodução
musicaPlay.addEventListener('canplaythrough', () => {
    console.log('Audio play is ready to be played.');
});

musicaPause.addEventListener('canplaythrough', () => {
    console.log('Audio pause is ready to be played.');
});

musicaBeep.addEventListener('canplaythrough', () => {
    console.log('Beep sound is ready to be played.');
});

// Adiciona eventos de depuração para áudio
musicaPlay.addEventListener('canplay', () => {
    console.log('Audio can start playing.');
});
musicaPlay.addEventListener('play', () => {
    console.log('Audio started playing.');
});
musicaPlay.addEventListener('pause', () => {
    console.log('Audio paused.');
});

musicaBeep.addEventListener('canplay', () => {
    console.log('Beep sound can start playing.');
});
musicaBeep.addEventListener('play', () => {
    console.log('Beep sound started playing.');
});
musicaBeep.addEventListener('pause', () => {
    console.log('Beep sound paused.');
});

const iniciarOuPausarBt = document.querySelector('#start-pause span');

// Configuração de Botões que mudam a evento de fundo e texto com clique
focoBt.addEventListener('click', () => alterarContexto('foco', focoBt));
curtoBt.addEventListener('click', () => alterarContexto('descanso-curto', curtoBt));
longoBt.addEventListener('click', () => alterarContexto('descanso-longo', longoBt));

function alterarContexto(contexto, botaoClicado) {
    botoes.forEach(botao => { 
        botao.classList.remove('active'); 
    });

    botaoClicado.classList.add('active');

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) { 
        case "foco": 
            titulo.innerHTML = `Otimize sua produtividade,<br> 
            <strong>melhore no que importa</strong>`; 
            break; 
        case "descanso-curto": 
            titulo.innerHTML = `Que tal dar uma respirada?<br> 
            <strong>Faça uma pausa curta!</strong>`; 
            break; 
        case "descanso-longo": 
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong>Faça uma pausa longa</strong>`; 
            break; 
        default: 
            titulo.innerHTML = ''; 
            break; 
    }
}

// Temporizador
/*
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        beepIntervalId(musicaBeep.play()) = setInterval(() => { 
            if (musicaBeep.ended) { 
                musicaBeep.currentTime = 0; // Reinicia o som se tiver terminado 
                musicaBeep.loop;
            } 
        }, 6000); // Reinicia o som a cada 6000ms (6 segundos, duração do som)
        alert('Tempo Finalizado');
        clearInterval(intervaloId); // Para o intervalo quando o tempo chega a zero
        clearInterval(beepIntervalId); // Pausa o som de alerta quando o usuário clicar em OK no alert
        musicaBeep.pause();
        musicaBeep.currentTime = 0; // Reseta o som de alerta para o início
        tempoDecorridoEmSegundos = 10; // Redefine o valor do temporizador
        timer.style.display = 'none'; // Esconde o temporizador novamente
        startPauseBt.querySelector('span').textContent = 'Começar'; // Atualiza o botão para 'Começar'
        intervaloId = null; // Reseta o intervaloId
        musicaPlay.pause();
        musicaPlay.currentTime = 0;
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo(); // Atualiza a exibição do tempo
};
*/
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        const tocarBeep = () => {
            musicaBeep.currentTime = 0; // Reinicia o som para o início
            musicaBeep.play();
        };

        const loopBeep = () => {
            tocarBeep(); // Toca o som inicialmente
            beepIntervalId = setInterval(() => {
                if (musicaBeep.ended) { 
                    tocarBeep(); // Reinicia o som se tiver terminado
                }
            }, 100); // Verifica o estado do som a cada 100ms para garantir a continuidade
        };

        loopBeep(); // Inicia o loop de verificação

        setTimeout(() => {
            alert('Tempo Finalizado');

            clearInterval(intervaloId); // Para o intervalo quando o tempo chega a zero
            clearInterval(beepIntervalId); // Para o intervalo de reinício do som
            musicaBeep.pause();
            musicaBeep.currentTime = 0; // Reseta o som de alerta para o início
            tempoDecorridoEmSegundos = 10; // Redefine o valor do temporizador
            timer.style.display = 'none'; // Esconde o temporizador novamente
            startPauseBt.querySelector('span').textContent = 'Começar'; // Atualiza o botão para 'Começar'
            intervaloId = null; // Reseta o intervaloId
            musicaPlay.pause();
            musicaPlay.currentTime = 0;
        }, 200); // Pequeno atraso para garantir que o som toque antes do alerta

        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo(); // Atualiza a exibição do tempo
};












function iniciar() {
    if (intervaloId === null) { // Verifica se o intervalo não está já rodando
        timer.style.display = 'block'; // Mostra o temporizador
        mostrarTempo(); // Garante que o temporizador começa exibindo o valor inicial
        intervaloId = setInterval(contagemRegressiva, 1000);
        startPauseBt.querySelector('span').textContent = 'Pausar'; // Atualiza o botão para 'Pausar'
        musicaPlay.play();
    } else {
        clearInterval(intervaloId); // Pausa o intervalo se já estiver rodando
        intervaloId = null;
        startPauseBt.querySelector('span').textContent = 'Começar'; // Atualiza o botão para 'Começar'
        musicaPlay.pause();
        musicaPlay.currentTime = 0;
        musicaPause.play();
    }
}


startPauseBt.addEventListener('click', iniciar);

function mostrarTempo() {
    const tempo = tempoDecorridoEmSegundos;
    timer.innerHTML = `${tempo}`; // Atualiza o novo elemento HTML com o tempo restante
}

mostrarTempo();
