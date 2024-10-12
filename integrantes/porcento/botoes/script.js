document.addEventListener("DOMContentLoaded", function () {
  const botao = document.getElementById("meuBotao")

  botao.addEventListener("click", function () {
    const larguraJanela = window.innerWidth
    const alturaJanela = window.innerHeight

    const larguraBotao = botao.offsetWidth
    const alturaBotao = botao.offsetHeight

    const posicaoX = Math.random() * (larguraJanela - larguraBotao)
    const posicaoY = Math.random() * (alturaJanela - alturaBotao)

    botao.style.transform = `translate(${posicaoX}px, ${posicaoY}px)`

    setTimeout(function () {
      botao.style.transform = "translate(0px, 0px)"
    }, 1000)
  })
})
