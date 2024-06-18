import React from 'react'
import '../App.css'

export const Home = ( { setAlinea4Comenzado,
                        setTatetiComenzado,
                        setGeneralaComenzado} ) => {
    
    const comenzarAlinea4 = ()=>{
      setAlinea4Comenzado(true)
    }
    const comenzarTateti = ()=>{
      setTatetiComenzado(true)
    }
    const comenzarGenerala = ()=>{
      setGeneralaComenzado(true)
    }

  return (
    <div className='home-container'>
      <h1>Sala de Juegos</h1>
      <button className='btn-comenzar-alinea4' onClick={comenzarAlinea4}>Jugar Alinea4</button>
      <button className='btn-comenzar-tateti' onClick={comenzarTateti}>Jugar TaTeTi</button>
      <button className='btn-comenzar-generala' onClick={comenzarGenerala}>Jugar Generala</button>
    </div>
  )
}
