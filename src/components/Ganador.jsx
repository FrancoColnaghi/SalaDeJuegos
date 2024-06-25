import React from 'react'

export const Ganador = ({ganador}) => {
  return (
    <div className="ganador">
      {ganador == 1 ? (
        <div className="G1">- Gana Jugador Rojo -</div>
      ) : ganador == 2 ? (
        <div className="G2">- Gana jugador Azul -</div>
      ) : ganador == 3 ? (
        <div className="EMP">- EMPATE -</div>
      ) : null}
    </div>
  );
}
