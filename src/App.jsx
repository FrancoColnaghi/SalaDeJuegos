import { useState } from 'react'
import './App.css'
import { Home } from './components/Home'
import { Alinea4 } from './components/alinea4/Alinea4'
import { Tateti } from './components/tateti/Tateti'

function App() {
  const [alinea4Comenzado, setAlinea4Comenzado] = useState(false)
  const [tatetiComenzado, setTatetiComenzado] = useState(false)

  return (
    <div className='app'>
      { alinea4Comenzado ?
          <Alinea4 setAlinea4Comenzado={setAlinea4Comenzado} />
        :
          tatetiComenzado ?
          <Tateti setTatetiComenzado={setTatetiComenzado}/>
            :
            <Home setAlinea4Comenzado={setAlinea4Comenzado}
                  setTatetiComenzado={setTatetiComenzado}/>
      }
    </div>
  )
}

export default App
