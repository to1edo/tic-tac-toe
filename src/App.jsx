import { useState,useEffect,useRef } from "react"
import Matriz from "./components/Matriz"
import audioClickFile from './assets/pop.mp3'
import audioEndFile from './assets/JitterGameSel.mp3'
import Volume from "./components/Volume"
import Turn from "./components/Turn"
import SelectGame from "./components/SelectGame"
import positions from './data'

function App() {

  let [matriz, setMatriz] = useState(
    [ ['','',''],
      ['','',''],
      ['','','']
    ]
  )
  const [marca, setMarca] = useState('X')
  const [final, setFinal] = useState(false)
  const [sound, setSound] = useState(true)
  const [winnerPos, setWinnerPos] = useState('')

  const [audioClick, setAudioClick] = useState(new Audio(audioClickFile))
  const audioClickRef = useRef(audioClick)
  const [audioEnd, setAudioEnd] = useState(new Audio(audioEndFile))
  const audioEndRef = useRef(audioEnd)

  const updateMatriz = (i,j)=>{
    audioClickRef.current.currentTime = 0
    audioClickRef.current.pause()
    audioClickRef.current.volume = sound

    const temporal = [...matriz];
    temporal[i] = [...temporal[i]];
    temporal[i][j] = marca;

    setMatriz(temporal)
    setMarca(marca === 'X' ? 'O': 'X')


    audioClickRef.current.play()
  }

  useEffect(() => {
    checkWinner()
  }, [matriz])
  

  const checkWinner = ()=>{
    const count  = new Map()

    //diagonal 1
    for (let i = 0 , j=2; i <=2 ; i++,j--) {
      if(matriz[i][j] === 'X'){
        count.set(`DX1`, count.get(`DX1`)+1 || 1 )
      }
      if(matriz[i][j] === 'O'){
        count.set(`DO1`, count.get(`DO1`)+1 || 1 )
      }
    }

    //diagonal 2
    for (let i = 0; i <=2 ; i++) {
      if(matriz[i][i] === 'X'){
        count.set(`DX2`, count.get(`DX2`)+1 || 1 )
      }
      if(matriz[i][i] === 'O'){
        count.set(`DO2`, count.get(`DO2`)+1 || 1 )
      }
    }

    //horizontales
    for (let i = 0 ; i <=2 ; i++) {
      for (let j = 0; j <=2; j++) {
        if(matriz[i][j] === 'X'){
          count.set(`HX${i}`, count.get(`HX${i}`)+1 || 1 )
        }
        if(matriz[i][j] === 'O'){
          count.set(`HO${i}`, count.get(`HO${i}`)+1 || 1 )
        }
      }
    }

    //verticales
    for (let j = 0 ; j <=2 ; j++) {
      for (let i = 0; i <=2; i++) {
        if(matriz[i][j] === 'X'){
          count.set(`VX${j}`, count.get(`VX${j}`)+1 || 1 )
        }
        if(matriz[i][j] === 'O'){
          count.set(`VO${j}`, count.get(`VO${j}`)+1 || 1 )
        }

      }
    }

    const result = Array.from(count).flat().filter( item => typeof(item) === 'number')
    
    if(result.includes(3) || !matriz.flat().includes('')){
      setFinal(true)  
      audioEndRef.current.volume = sound
      audioEndRef.current.play()

      Array.from(count).flat().forEach((item,index,array)=>{
        if( item === 3){
          setWinnerPos(array[--index].replace('X','').replace('O',''))
        }
      })
    }

  }


  const resetGame = ()=>{
      
    setFinal(false)
    setMatriz([ 
      ['','',''],
      ['','',''],
      ['','','']
    ])
  }

  return (
    <>
      <div className="grid w-full max-w-md mx-auto px-10">
        
          <div className="flex items-center">
            <Volume sound={sound} setSound={setSound}/>
            <SelectGame/>
          </div>
          
          <h1 className='text-[#ffcc39] font-black text-4xl text-center mt-20 sm:mt-12'>Tic <span className="text-[#ec1652]">Tac</span> Toe</h1>
          {
            final || <Turn marca={marca}/>
          }

          
          <Matriz 
            matriz={matriz} 
            updateMatriz={updateMatriz} 
            final={final} 
            winnerPos={winnerPos} 
            positions={positions}
          />

          {
            final && (
              <>
                <p className="font-black text-center mt-12 text-white text-2xl">El juego ha terminado</p>
                <button 
                  className="p-2 bg-[#664ac5] font-bold text-white rounded-xl mt-8"
                  onClick={()=> resetGame()}
                >
                  Jugar de nuevo
                </button>
              </>
            )
          }
      </div>
    </>
    
  )   
}

export default App
