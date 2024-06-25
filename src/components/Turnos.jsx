import React from 'react'

export const Turnos = ({turno}) => {
  return (
    <div className="turnos">
      <div className="title">TURNO:</div>
      {turno == 1 ? (
        <div className="J1">Jugador Rojo</div>
      ) : (
        <div className="J2">Jugador Azul</div>
      )}
    </div>
  );
}
