export const casaVazia = " "

export function adicionarJogada(jogo, jogador, linha, coluna) {
    const novoTabuleiro = [...jogo.tabuleiro]; // cria um shallow clone do tabuleiro original

    const novoJogo = {
      tabuleiro: novoTabuleiro,
      jogadorAtual: jogo.jogadorAtual === "X" ? "O" : "X", // alterna o jogador atual
    };
    
    for (let linhas = 0; linhas < jogo.tabuleiro.length; linhas++) {
      novoTabuleiro[linhas] = new Array(jogo.tabuleiro[linhas].length);
      for (let colunas = 0; colunas < jogo.tabuleiro[linhas].length; colunas++) {
        novoTabuleiro[linhas][colunas] = jogo.tabuleiro[linhas][colunas];
      }
    }
        
    if (novoTabuleiro[linha][coluna] === casaVazia) { // verifica se a posição está vazia
      novoTabuleiro[linha][coluna] = jogador; // adiciona a jogada no tabuleiro
    }
      return novoJogo; // retorna o objeto igual ao original caso a posição já esteja ocupada
}


export function verificarVencedor(jogo) {
    const sequencias = obtemSequencias(jogo)
    if (sequencias.includes("XXX")) return "X"
    if (sequencias.includes("OOO")) return "O"
    return undefined
}

function obtemSequencias(jogo) {
    // [XXX", "___", "___", "___", "___", "___", "___", "___"]

    return obtemLinhas(jogo)
        .concat(obtemColunas(jogo))
        .concat(obtemDiagonais(jogo))
}

function obtemLinhas(jogo) {
    let linhas = []

    for (let i = 0; i < jogo.tabuleiro.length; i++) {
        linhas.push(jogo.tabuleiro[i].join(""))
    }
    return linhas
}

function obtemColunas(jogo) {
    let colunas = []

    for (let i = 0; i < jogo.tabuleiro.length; i++) {
        // i = coluna
        let coluna = ""
        for (let j = 0; j < jogo.tabuleiro.length; j++) {
            // j = linha
            coluna += jogo.tabuleiro[j][i]
        }
        colunas.push(coluna)
    }
    return colunas
}


function obtemDiagonais(jogo) {
    let diagonais = ["", ""] // guarda as duas diagonais

    for (let i = 0; i < jogo.tabuleiro.length; i++) {
        diagonais[0] += jogo.tabuleiro[i][i] // diagonal principal
        diagonais[1] += jogo.tabuleiro[i][jogo.tabuleiro.length - 1 - i] // diagonal secundária
    }
    return diagonais
}


export function obterJogadasPossiveis(jogo) {
    let jogadasPossiveis = []
  
    for (let linha = 0; linha < jogo.tabuleiro.length; linha++) {
        for (let coluna = 0; coluna < jogo.tabuleiro[linha].length; coluna++) {
            if (jogo.tabuleiro[linha][coluna] === casaVazia) {
                jogadasPossiveis.push({ linha: linha, coluna: coluna })
            }
        }
    }

    return jogadasPossiveis
}
  
export function verificarFimDoJogo(jogo) {
      return obterJogadasPossiveis(jogo).length === 0
          || verificarVencedor(jogo) !== undefined
}
