

const Turn = ({marca}) => {
  return (
    <div className="flex items-center justify-center mt-9 gap-16">

      <div className={`${marca === 'X' ? 'border-2 border-white':''} text-center px-4 py-1 rounded-xl bg-[#101032]`}>
        {/* <p className="text-white font-bold">One</p> */}
        <p className="text-[#ec1652] font-black text-4xl">X</p>
      </div>
      <div className={`${marca === 'O' ? 'border-2 border-white':''} text-center px-4 py-1 rounded-xl bg-[#101032]`}>
        {/* <p className="text-white font-bold">Two</p> */}
        <p className="text-[#ffcc39] font-black text-4xl">O</p>
      </div>

    </div>
  )
}

export default Turn