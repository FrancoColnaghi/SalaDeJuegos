import React from 'react'

export const Celda = ({contenido, index, agregarFicha, turno}) => {

    const click = ()=>{
        agregarFicha(turno,index)
    }

  return (
    <button className={contenido === null ? 'celda' :
                        contenido === 1 ? 'celda rojo' : 'celda azul' }
            onClick={click}>{contenido}
    </button>
  )
}
