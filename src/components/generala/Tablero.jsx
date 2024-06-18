import React, { useEffect, useState } from "react";

export const Tablero = ({
  estadoRonda,
  dadosFijados,
  servido, setServido,
  siguienteRonda,
  puntosConcretados, setPuntosConcretados,
  casillaConcretada, setCasillaConcretada,
  puntosPosibles, setPuntosPosibles,
  total, setTotal
}) => {
  

  let nombres_jugadas = [
    "Numeros 1",
    "Numeros 2",
    "Numeros 3",
    "Numeros 4",
    "Numeros 5",
    "Numeros 6",
    "Escalera",
    "Full House",
    "Poker",
    "Generala",
  ];

  const controlar_jugadas = (dadosFijados) => {
    console.log("ejecutado");
    // Array para calcular todos los puntos posibles con cada Juego
    let nuevoPuntosPosibles = [];

    // del 1 al 6
    for (let i = 1; i < 7; i++) {
      let cant = 0;
      dadosFijados.forEach((e) => {
        e == i ? cant++ : null;
      });
      nuevoPuntosPosibles.push(cant);
    }
    // Escalera
    let hay_escalera = true;
    nuevoPuntosPosibles.map((cont, i) => {
      cont > 1 ? (hay_escalera = false) : null;
    });
    hay_escalera
      ? servido
        ? nuevoPuntosPosibles.push(25)
        : nuevoPuntosPosibles.push(20)
      : nuevoPuntosPosibles.push(0);
    //Full House
    let hay_full = false;
    let hay2 = false;
    let hay3 = false;
    nuevoPuntosPosibles.map((cont, i) => {
      cont == 2 ? (hay2 = true) : cont == 3 ? (hay3 = true) : null;
    });
    hay2 && hay3 ? (hay_full = true) : null;
    hay_full
      ? servido
        ? nuevoPuntosPosibles.push(35)
        : nuevoPuntosPosibles.push(30)
      : nuevoPuntosPosibles.push(0);
    //Poker
    let hay_poker = false;
    nuevoPuntosPosibles.map((cont, i) => {
      cont == 4 ? (hay_poker = true) : null;
    });
    hay_poker
      ? servido
        ? nuevoPuntosPosibles.push(45)
        : nuevoPuntosPosibles.push(40)
      : nuevoPuntosPosibles.push(0);
    //Generala
    let hay_generala = false;
    nuevoPuntosPosibles.map((cont, i) => {
      cont == 5 ? (hay_generala = true) : null;
    });
    hay_generala
      ? servido
        ? nuevoPuntosPosibles.push(60)
        : nuevoPuntosPosibles.push(50)
      : nuevoPuntosPosibles.push(0);

    setPuntosPosibles(nuevoPuntosPosibles);
  };
  const concretar = (i) => {
    let nuevoPuntosConcretados = [...puntosConcretados];
    nuevoPuntosConcretados[i] = puntosPosibles[i];
    setPuntosConcretados(nuevoPuntosConcretados);

    let nuevaCasillaConcretada = [...casillaConcretada];
    nuevaCasillaConcretada[i] = true;
    setCasillaConcretada(nuevaCasillaConcretada);

    siguienteRonda();
    setServido(false);
  };

  useEffect(() => {
    estadoRonda == 1 ? controlar_jugadas(dadosFijados) : null;
  }, [estadoRonda]);
  useEffect(() => {
    puntosPosibles.length > 0
      ? console.log(`PuntosPosibles: ${puntosPosibles}`)
      : null;
  }, [puntosPosibles]);
  useEffect(() => {
    let nuevoTotal = 0;
    puntosConcretados.map((cont, i) => {
      nuevoTotal = nuevoTotal + cont;
    });
    setTotal(nuevoTotal);
  }, [puntosConcretados]);

  return (
    <ul className="tablero">
      <li className="titulos">
        {estadoRonda == 0 ? <div>General</div> : <div>Elegir Sumar</div>}
      </li>
      {nombres_jugadas.map((cont, i) =>
        casillaConcretada[i] == true ? (
          <li className="linea concretada" key={i}>
            <div>{cont}</div>
            <div>{puntosConcretados[i]} pts</div>
          </li>
        ) : (
          <li
            className="linea"
            key={i}
            onClick={() => {
              concretar(i);
            }}
          >
            <div>{cont}</div>
            {estadoRonda == 0 ? (
              <div>{puntosConcretados[i]} pts</div>
            ) : (
              <div>+ {puntosPosibles[i]}</div>
            )}
          </li>
        )
      )}
      <li className="total">
        <div>TOTAL</div>
        <div>{total} PTS</div>
      </li>
    </ul>
  );
};
