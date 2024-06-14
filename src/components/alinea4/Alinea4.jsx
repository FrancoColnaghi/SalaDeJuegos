import React, { useEffect, useState } from "react";
import "../../app.css";
import { Celda } from "./Celda";
import { controlarGanador } from "./ganador.js";

export const Alinea4 = ({ setAlinea4Comenzado }) => {
  // Estado de Turno de jugador ( valores 1 o 2)
  const [turno, setTurno] = useState(1);
  // Array que representa todas las posiciones del tablero (7 x 6)
  const [tablero, setTablero] = useState(Array(42).fill(null));
  // Estado para controlar si alguien ganó ya la partida
  const [ganador, setGanador] = useState(null);
  // Estado del Juego iniciado
  const [iniciado, setIniciado] = useState(false);

  // Funcion para boton de volver al Inicio
  const volverInicio = () => {
    setAlinea4Comenzado(false);
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
  const determinarColumna = (n) => {
    let r = (n + 1) % 7;
    if (r == 0) {
      r = 7;
    }
    return r;
  };
  const determinarCelda = (c) => {
    let cel;
    tablero[c + 34] === null
      ? (cel = c + 34)
      : tablero[c + 27] === null
      ? (cel = c + 27)
      : tablero[c + 20] === null
      ? (cel = c + 20)
      : tablero[c + 13] === null
      ? (cel = c + 13)
      : tablero[c + 6] === null
      ? (cel = c + 6)
      : tablero[c - 1] === null
      ? (cel = c - 1)
      : (cel = null);
    return cel;
  };

  useEffect(() => {
    iniciado
      ? controlarGanador(tablero)
        ? setGanador(turno)
        : cambiarTurno()
      : null;
  }, [tablero]);

  useEffect(() => {
    if (iniciado) {
      console.log(`Ganador: ${ganador}`);
      setIniciado(false);
    }
  }, [ganador]);

  useEffect(() => {
    reiniciarJuego();
  }, []);

  // Al hacer click sobre una ficha se ejecuta esta funcion
  const agregarFicha = (turno, index) => {
    // Si el juego esta iniciado
    if (iniciado) {
      // Determina en que columna está la ficha
      let col = determinarColumna(index);
      // Determina que celda es la proxima a rellenar (de Arriba hacia Abajo)
      let cel = determinarCelda(col);
      // Si la celda a rellenar ex correcta (es decir todavia hay lugar en esa columna)
      if (cel) {
        // Creo un tablero auxiliar y hago una copia del tablero original
        const nuevoTablero = [...tablero];
        // Edito el tablero aux en la posicion indicada con el jugador de turno
        nuevoTablero[cel] = turno;
        // Seteo como nuevo tablero el tablero auxiliar
        setTablero(nuevoTablero);
      }
    }
  };

  return (
    <div className="alinea4-container">
      <h2>ALINEA-4</h2>
      <div className="botones">
        <button onClick={volverInicio}>Volver a Inicio</button>
        <button onClick={reiniciarJuego}>Reiniciar Juego</button>
      </div>
      {ganador ? (
        <div className="ganador">
          {ganador == 1 ? (
            <div className="G1">- Gana Jugador Rojo -</div>
          ) : (
            <div className="G2">- Gana jugador Azul -</div>
          )}
        </div>
      ) : (
        <div className="turnos">
          <div className="title">TURNO:</div>
          {turno == 1 ? (
            <div className="J1">Jugador Rojo</div>
          ) : (
            <div className="J2">Jugador Azul</div>
          )}
        </div>
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
  );
};
