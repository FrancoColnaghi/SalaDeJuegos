import React, { useEffect, useState } from 'react'
import { Celda } from './Celda';
import { controlarGanador } from "./ganador.js";
import { Header } from '../Header.jsx';
import { Turnos } from '../Turnos.jsx';
import { Ganador } from '../Ganador.jsx';

export const Tateti = ({setTatetiComenzado}) => {
  // Estado de Turno de jugador ( valores 1 o 2)
  const [turno, setTurno] = useState(1);
  // Array que representa todas las posiciones del tablero (7 x 6)
  const [tablero, setTablero] = useState(Array(9).fill(null));
  // Estado para controlar si alguien ganó ya la partida
  const [ganador, setGanador] = useState(null);
  // Estado del Juego iniciado
  const [iniciado, setIniciado] = useState(false);

  const volverInicio = () => {
    setTatetiComenzado(false);
  };

  // Funcion reiniciar Juego
   const reiniciarJuego = async () => {
    await setIniciado(false);
    await setTablero(tablero.fill(null));
    await setGanador(null);
    await setTurno(1);
    await setIniciado(true);
  };

  const cambiarTurno = () => {
    turno == 1 ? setTurno(2) : setTurno(1);
  };

  useEffect(() => {
    iniciado
      ? controlarGanador(tablero)==1
        ? setGanador(turno)
        : controlarGanador(tablero)==2
          ? setGanador(3)
          :cambiarTurno()
      : null;
  }, [tablero]);

  useEffect(() => {
    if (iniciado) {
      setIniciado(false);
    }
  }, [ganador]);

  useEffect(() => {
    reiniciarJuego();
  }, []);

  // Al hacer click sobre una ficha se ejecuta esta funcion
  const agregarFicha = (turno, index) => {
    if (iniciado) {
      if (tablero[index] == null) {
        // Creo un tablero auxiliar y hago una copia del tablero original
        let nuevoTablero = [...tablero];
        // Edito el tablero aux en la posicion indicada con el jugador de turno
        nuevoTablero[index] = turno;
        // Seteo como nuevo tablero el tablero auxiliar
        setTablero(nuevoTablero);
      }
    }
  };

  return (
    <div className='tateti-container'>
      <Header reiniciarJuego={reiniciarJuego}
              volverInicio={volverInicio}
              nombreJuego={"TaTeTi"}/>
      {ganador ? (
        <Ganador ganador={ganador}/>
      ) : (
        <Turnos turno={turno}/>
      )}
      <div className="tablero">
        {tablero.map((contenido, index) => {
          return (
            <Celda
              key={index}
              index={index}
              contenido={contenido}
              turno={turno}
              agregarFicha={agregarFicha}
            />
          );
        })}
      </div>
    </div>
  )
}
