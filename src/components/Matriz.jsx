import Turn from "./Turn";

const Matriz = ({ matriz, updateMatriz, final,winnerPos,positions,marca,gameMode,setTurn}) => {


  return (
    <div className={`grid grid-cols-3 w-full bg-[#664ac5] gap-2 p-2 rounded-xl ${final? 'mt-[120px] ':'mt-8'}`}>
      { matriz.map((fila,i) =>
          fila.map((celda,j) => (
            <div 
                key={[i,j]} 
                className={`rounded-xl border border-black h-16 flex items-center justify-center text-6xl font-black ${ celda.trim()?'cursor-default':'cursor-pointer'} ${celda === 'X' ? 'text-[#ec1652]' : 'text-[#ffcc39]'} ${final && positions[i][j].includes(winnerPos)? 'shadow-[0_0px_10px_2px_#fff] border-white' : ''} bg-[#101032]`}
                onClick={function(e){ 

                  if(marca === 'X' || gameMode === 0)
                    if(!celda && !final){setTurn(1); updateMatriz(i,j);}
                }}
            >
              { celda }
            </div>
          ))
        )
      }
    </div>
  );
};

export default Matriz;
