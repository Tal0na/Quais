let autores = [];
let currentStreak = 0;
let respostaCorreta = "";
const questionContainer = document.getElementById('question');
const resultContainer = document.getElementById('result');
const streakInfoContainer = document.getElementById('streak-info');

async function carregarDados() {
  const response = await fetch('quizData.json'); // Carrega o JSON
  const data = await response.json(); // Converte para objeto JavaScript
  autores = Object.keys(data.authors); // Obtém os autores dinamicamente
  gerarPergunta(data); // Gera a primeira pergunta
}

// Função para gerar uma nova pergunta
function gerarPergunta(data) {
  const autorAleatorio = autores[Math.floor(Math.random() * autores.length)];
  const frases = data.authors[autorAleatorio];
  const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

  questionContainer.textContent = fraseAleatoria.quote; // Exibe a frase
  respostaCorreta = autorAleatorio; // Armazena a resposta correta
  atualizarBotoes(data); // Atualiza os botões
}

function atualizarBotoes(data) {
  const buttonsContainer = document.getElementById('buttons-container');
  buttonsContainer.innerHTML = ''; // Limpa os botões

  autores.forEach((autor, index) => {
    const button = document.createElement('button');
    button.textContent = autor;
    button.className = `botao${index + 1}`; // Atribui a classe para cor personalizada
    button.onclick = () => verificarResposta(autor, data);
    buttonsContainer.appendChild(button);
  });
}

function verificarResposta(autor, data) {
  if (autor === respostaCorreta) {
    currentStreak++;
    resultContainer.textContent = "Correto!";
  } else {
    currentStreak = 0;
    resultContainer.textContent = `Incorreto! A resposta correta era ${respostaCorreta}.`;
  }

  streakInfoContainer.textContent = `Sequência atual: ${currentStreak}`;

  setTimeout(() => gerarPergunta(data), 1000); // Gera uma nova pergunta após 1 segundo
}

// Inicializa o quiz
carregarDados();