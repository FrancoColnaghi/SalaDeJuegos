import React from 'react'

export const Header = ({volverInicio,reiniciarJuego}) => {


  return (
    <>
        <h2>Generala</h2>
        <div className="botones">
            <button onClick={volverInicio}>Volver a Inicio</button>
            <button onClick={reiniciarJuego}>Reiniciar Juego</button>
        </div>
    </>
  )
}
