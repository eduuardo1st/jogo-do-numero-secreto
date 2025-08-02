let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirMensagemInicial();

function exibirTextoNaTela(tag, texto)
{
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function verificarChute()
{
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto)
    {
        exibirTextoNaTela('h1', 'Você acertou!');
        let mensagemTentativas = tentativas > 1 ? ' tentativas.' : ' tentativa.';
        exibirTextoNaTela('p', 'Você acertou o número secreto (' + numeroSecreto + ') em ' + tentativas + mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else
    {
        if(chute < numeroSecreto)
        {
            exibirTextoNaTela('p', 'O número secreto é maior que ' + chute);
        }
        else
        {
            exibirTextoNaTela('p', 'O número secreto é menor que ' + chute);
        }
        tentativas++;
        limparCampo();
        exibirTextoNaTela('h1', 'Tente novamente');
    }
}

function gerarNumeroAleatorio()
{
    let numeroEscolhido = parseInt(Math.random() * numeroLimite) + 1;
    let quantidadeDeElementos = listaDeNumerosSorteados.length;

    if(quantidadeDeElementos >= numeroLimite)
    {
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido))
    {
        return gerarNumeroAleatorio();
    }
    else
    {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo()
{
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo()
{
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function exibirMensagemInicial()
{
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Adivinhe o número secreto entre 1 e 100');
}