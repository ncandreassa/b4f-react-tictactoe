import { useState } from "react";
import "./TicTacToe.css";
import {
  casaVazia,
  adicionarJogada,
  verificarVencedor,
  obtemSequencias,
  obtemLinhas,
  obtemColunas,
  obtemDiagonais,
  obterJogadasPossiveis,
  verificarFimDoJogo,
} from "./logica";

let jogoVazio = {
  tabuleiro: [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ],
  jogadorAtual: "X",
};

function TicTacToe() {
  const [jogo, setState] = useState(jogoVazio);

  return (
    <main>
      <h1>JOGO DO GALO 🐓</h1>
      {!verificarFimDoJogo(jogo) ? (
        <h2>O jogador atual é o: {jogo.jogadorAtual}!</h2>
      ) : verificarVencedor(jogo) ? (
        <h2>
          Fim de Jogo. O Vencedor foi o Jogador: {verificarVencedor(jogo)}!
        </h2>
      ) : (
        <h2>Fim de Jogo. Ninguém ganhou!</h2>
      )}

      <button onClick={() => setState(jogoVazio)}>Reiniciar Jogo</button>
      <div className="jogo">
        {jogo.tabuleiro.map((linha, i) => (
          <div className="linha">
            {linha.map((casa, j) => (
              <div
                className={`casa ${casa !== " " ? "clicked" : ""}`}
                onClick={() => {
                  if (!verificarFimDoJogo(jogo)) {
                    if (casa === casaVazia) {
                      return setState(
                        adicionarJogada(jogo, jogo.jogadorAtual, i, j)
                      );
                    }
                  }
                }}
              >
                <p>{casa}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

export default TicTacToe;
