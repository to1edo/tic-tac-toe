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
  const [sound, setSound] = useState(false)
  const [winnerPos, setWinnerPos] = useState('')
  const [attempts, setAttempts] = useState([])
  const [turn, setTurn] = useState(0)
  const [gameMode, setGameMode] =useState(0)

  const audioClickRef = useRef(new Audio(audioClickFile))
  const audioEndRef = useRef(new Audio(audioEndFile))

  const updateMatriz = (i,j)=>{
    audioClickRef.current.currentTime = 0
    // audioClickRef.current.pause()
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

  useEffect(()=>{
    resetGame()
  },[gameMode])

  useEffect(()=>{
    if(attempts.length){
      attempts.forEach((item,index,array)=>{
        if( item === 3){
          setWinnerPos(array[--index].replace('X','').replace('O',''))
          console.log(array[index].replace('X',''))
        }
      })
    }
  },[attempts])

  const anyoneWon = (matriz)=>{
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
    setAttempts(Array.from(count).flat())
    const result =  Array.from(count).flat().filter( item => typeof(item) === 'number').includes(3)
    return result

  }

  const checkWinner = ()=>{
    
    const result = anyoneWon(matriz)

    if(result || !matriz.flat().includes('')){

      setFinal(true)
      
      if(result){
        audioEndRef.current.volume = sound
        audioEndRef.current.play()
      }

    }else{
      if(!final && gameMode === 1 && turn === 1){
        pcPlay()
      }
    }
    
    setTurn(0)
  }


  const resetGame = ()=>{

    setFinal(false)
    setMatriz([
      ['','',''],
      ['','',''],
      ['','','']
    ])
    setWinnerPos('')
    setMarca('X')
  }

  const pcPlay = ()=>{
    
    const temporal = [...matriz];
    let jugadas
    // temporal[i] = [...temporal[i]];
    // temporal[i][j] = marca;

    //jugar a ganar (mas de 2 jugadas hechas)
    jugadas = 0
    for (let i = 0 ; i <= 2 ; i++) {
      for (let j = 0 ; j <=2 ; j++) {
        if(temporal[i][j] === 'O'){
          jugadas++
        }
      }
    }

    let attemptOne = 0
    if(jugadas >= 2){

      for (let i = 0 ; i <= 2 ; i++) {
        for (let j = 0 ; j <=2 ; j++) {
          if(temporal[i][j] === ''){
            temporal[i] = [...temporal[i]]
            temporal[i][j] = 'O'
            const result = anyoneWon(temporal)
            if(result){
              attemptOne = 1
              console.log('Win',[i,j],marca)
              
              setTimeout(() => {
                updateMatriz(i,j)
              }, 400);
              
            }
            temporal[i][j] = ''
          }
        }
      }

    }

    //evitar victoria del contrario (mas de 2 jugadas contrarias hechas)
    let attemptTwo = 0
    if(!attemptOne){

      jugadas=0
      for (let i = 0 ; i <= 2 ; i++) {
        for (let j = 0 ; j <=2 ; j++) {
          if(temporal[i][j] === 'X'){
            jugadas++
          }
        }
      }

      if(jugadas >= 2){
  
        for (let i = 0 ; i <= 2 ; i++) {
          for (let j = 0 ; j <=2 ; j++) {
            if(temporal[i][j] === ''){
              temporal[i] = [...temporal[i]]
              temporal[i][j] = 'X'
              const result = anyoneWon(temporal)
              if(result){
                attemptTwo = 1
                console.log('Win',[i,j],'X')
                
                setTimeout(() => {
                  updateMatriz(i,j)
                }, 400);
              }
              temporal[i][j] = ''
            }
          }
        }
      }

    }

    //jugada random
    if(!attemptOne && !attemptTwo){
        const celdasVacias = []
    
        matriz.forEach( (fila,i) =>{
          fila.forEach( (celda,j) =>{
            if(!celda){
              celdasVacias.push([i,j])
            }
          })
        })
        
        if(turn && celdasVacias.length){
          const [i,j] = celdasVacias[ parseInt( Math.random()*(celdasVacias.length-1) ) ]
          // console.log(i,j)
    
          setTimeout(() => {
            updateMatriz(i,j)
          }, 400);
    
        }
    }
  }

  return (
    <>
      <div className="grid w-full max-w-md mx-auto px-10">

          <div className="flex items-center">
            <Volume sound={sound} setSound={setSound}/>
            <SelectGame gameMode={gameMode} setGameMode={setGameMode}/>
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
            setTurn={setTurn}
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
