import React from 'react'

export const Header = ({nombreJuego,reiniciarJuego,volverInicio}) => {
  return (
    <header>
      <h2>{nombreJuego}</h2>
      <div className="botones">
        <button onClick={volverInicio}>Volver a Inicio</button>
        <button onClick={reiniciarJuego}>Reiniciar Juego</button>
      </div>
    </header>
  );
}
