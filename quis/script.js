let autores = [];
let currentStreak = 0;
let respostaCorreta = "";
const questionContainer = document.getElementById('question');
const resultContainer = document.getElementById('result');

// Função para carregar os dados do quiz
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

// Função para atualizar os botões de resposta
function atualizarBotoes(data) {
  const buttonsContainer = document.getElementById('buttons-container');
  buttonsContainer.innerHTML = ''; // Limpa os botões

  // Adiciona os autores como botões
  autores.forEach(autor => {
    const button = document.createElement('button');
    button.textContent = autor;
    button.onclick = () => verificarResposta(autor, data); // Passa os dados para verificar
    buttonsContainer.appendChild(button);
  });
}

// Função para verificar a resposta
function verificarResposta(autor, data) {
  if (autor === respostaCorreta) {
    currentStreak++; // Aumenta a sequência
    resultContainer.textContent = "Correto!";
  } else {
    currentStreak = 0; // Reseta a sequência
    resultContainer.textContent = `Incorreto! A resposta correta era ${respostaCorreta}.`;
  }

  // Atualiza a informação da sequência
  document.getElementById('streak-info').textContent = `Sequência atual: ${currentStreak}`;

  // Gera uma nova pergunta após 1 segundo
  setTimeout(() => gerarPergunta(data), 1000);
}

// Chama a função para carregar os dados do JSON
carregarDados();
