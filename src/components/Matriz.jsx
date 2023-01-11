const Matriz = ({ matriz, updateMatriz, final}) => {


  return (
    <div className={`grid grid-cols-3 w-full bg-[#664ac5] gap-2 p-2 rounded-xl ${final? 'mt-28 sm:mt-36':'mt-8'}`}>
      { matriz.map((fila,i) =>
          fila.map((celda,j) => (
            <div 
                key={[i,j]} 
                className={`rounded-xl border border-black h-16 flex items-center justify-center text-6xl font-black ${ celda.trim()?'cursor-default':'cursor-pointer'} ${celda === 'X' ? 'text-[#ec1652]' : 'text-[#ffcc39]'} bg-[#101032]`}
                onClick={()=>{ !celda && !final ? updateMatriz(i,j) : '' }}
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
