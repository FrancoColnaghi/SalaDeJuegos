import React, { useEffect, useState } from "react";
import { Tablero } from "./Tablero";
import { Header } from "../Header";

export const Generala = ({ setGeneralaComenzado }) => {
  const [dados, setDados] = useState([]);
  const [dadosFijados, setDadosFijados] = useState([]);
  const [tirosDisponibles, setTirosDisponibles] = useState(3);
  const [ronda, setRonda] = useState(1);
  const [servido, setServido] = useState(false)
  // Estado 0 para cuando se estan tirando los dados
  // Estado 1 para cuando se finalizo la tirada de dados
  const [estadoRonda, setEstadoRonda] = useState(0)
  const [puntosConcretados, setPuntosConcretados] = useState(Array(10).fill(0));
  const [casillaConcretada, setCasillaConcretada] = useState(Array(10).fill(false));
  const [puntosPosibles, setPuntosPosibles] = useState([]);
  const [total, setTotal] = useState(0);

  // Funcion para boton de volver al Inicio
  const volverInicio = () => {
    setGeneralaComenzado(false);
  };
  // Funcion reiniciar Juego
  const reiniciarJuego = () => {
    let nuevoJuego = [null, null, null, null, null];
    setDados(nuevoJuego);
    setDadosFijados([]);
    setTirosDisponibles(3);
    setRonda(1)
    setEstadoRonda(0)
    setPuntosConcretados(Array(10).fill(0))
    setCasillaConcretada(Array(10).fill(false))
    setPuntosPosibles([])
    setTotal(0)
  };
  // Funcion Tirar Dados
  const tirar_dados = async () => {
    let nuevoDados = [];
    let fin = 0;
    const intervalID = await setInterval(async () => {
      nuevoDados = [];
      await dados.map((valor, index) => {
        let nuevoNumRandom = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        nuevoDados.push(nuevoNumRandom);
      });
      await setDados(nuevoDados);
      fin++;
      if (fin >= 12) {
        clearInterval(intervalID);
        let nuevosTirosDisponibles = tirosDisponibles - 1;
        setTirosDisponibles(nuevosTirosDisponibles);
      }
    }, 60);
  };
  // Funcion Fijar Dado
  const fijar_dado = (pos) => {
    if (tirosDisponibles == 2 || tirosDisponibles == 1){
      let dadoSeleccionado = dados[pos];
      let nuevoDadosFijados = [...dadosFijados, dadoSeleccionado];
      setDadosFijados(nuevoDadosFijados);
  
      let nuevoDados = [...dados];
      nuevoDados.splice(pos, 1);
      setDados(nuevoDados);
    } else {
      console.log("No es posible fijar dado no tirado")
    }
  };
  // Funcion Boton Siguiente Ronda
  const siguienteRonda = ()=>{
    let nuevoJuego = [null, null, null, null, null];
    setDados(nuevoJuego);
    setDadosFijados([]);
    setTirosDisponibles(3);

    let nuevaRonda = ronda + 1
    setRonda(nuevaRonda)
    setEstadoRonda(0)
  }
  // Funcion Boton Fijar Todos
  const fijar_todos = ()=>{
    tirosDisponibles == 2 ? setServido(true) : null
    let nuevoDadosFijados = [...dadosFijados];
    dados.map((cont,i)=>{
      nuevoDadosFijados.push(dados[i])
    })
    setDados([])
    setDadosFijados(nuevoDadosFijados)
    setTirosDisponibles(0)
  }
  //-----------------------------------------------------------------
  useEffect(() => {
    reiniciarJuego();
  }, []);

  useEffect(() => {
    if (tirosDisponibles == 0) {
      let nuevoDadosFijados = [...dadosFijados];
      dados.map((cont, i) => {
        nuevoDadosFijados = [...nuevoDadosFijados, dados[i]];
      });
      setDadosFijados(nuevoDadosFijados);
      let nuevoDados = [...dados];
      nuevoDados.splice(0, dados.length);
      setDados(nuevoDados);
      setEstadoRonda(1)
    }
  }, [tirosDisponibles]);

  useEffect(()=>{
    // Si ya todos los dados estan fijados, Finalizar Ronda
    if (dadosFijados.length == 5) {
      setTirosDisponibles(0)
      setEstadoRonda(1)
    }
  }, [dadosFijados])

  return (
    <div className="generala-container">
      <Header reiniciarJuego={reiniciarJuego}
              volverInicio={volverInicio}
              nombreJuego={"Generala"}/>
      <div className="dados-container">
      {ronda == 11 ? (<>
        <div>- JUEGO FINALIZADO -</div>
      </>
      ): (
        <>
        <div>- Ronda {ronda} / 10 -</div>
        { tirosDisponibles == 0 ? 
          null
          :
          <div>- Tiros Restantes: {tirosDisponibles} -</div>
        }
        {tirosDisponibles == 2 ?
          <button className="fijar" onClick={fijar_todos}>
            Fijar Servidos</button>  
          : tirosDisponibles == 1 ? 
            <button className="fijar" onClick={fijar_todos}>
              Fijar Todos</button>
            : null
        }
        <div className="fijados">
          {tirosDisponibles == 3 ? null : (<>
            {tirosDisponibles > 0 ? (
              <h3 className="title">Fijados</h3>
            ) : (
              <h3 className="title">JUEGO:</h3>
            )}
            <div className="serie-dados">
              {dadosFijados.map((cont, i) => (
                <div key={i}>{cont}</div>
              ))}
            </div>
            </>)}
        </div>
        {tirosDisponibles > 0 ? (
          <div className="atirar">
            <button className="title" onClick={tirar_dados}>
              Tirar
            </button>
            <div className="serie-dados">
              {dados.map((cont, i) => (
                <button
                  onClick={() => {
                    fijar_dado(i);
                  }}
                  key={i}
                >
                  {dados[i] ? cont : "-"}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        </>
      )
      }
        
        
      </div>
      <Tablero  dadosFijados={dadosFijados}
                siguienteRonda={siguienteRonda}
                estadoRonda={estadoRonda}
                setEstadoRonda={setEstadoRonda}
                servido={servido}
                setServido={setServido}
                puntosConcretados={puntosConcretados}
                setPuntosConcretados={setPuntosConcretados}
                casillaConcretada={casillaConcretada}
                setCasillaConcretada={setCasillaConcretada}
                puntosPosibles={puntosPosibles}
                setPuntosPosibles={setPuntosPosibles}
                total={total}
                setTotal={setTotal}
      />
    </div>
  );
};
