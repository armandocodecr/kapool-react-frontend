import { NavLink } from 'react-router-dom'

export const WelcomeTitle = () => {
  return (
    <div className="flex items-center flex-col">
        <h1 className="text-xl font-bold text-white tracking-wide sm:text-3xl md:text-4xl lg:text-5xl">Te damos la bienvenida a</h1>
        <h2 className="uppercase text-6xl font-extrabold tracking-wide md:text-8xl lg:text-9xl">
          <span className="text-[#1F51FF]">K</span>
          <span className='text-white'>a</span>
          <span className="text-[#FF3131]">po</span>
          <span className='text-white'>o</span>
          <span className="text-[#1F51FF]">l</span>
        </h2>
        <NavLink to='/join'>
          <button className='w-72 scale bg-[#EF8354] p-3 text-[#242634] tracking-tight font-bold rounded mt-10 ease-in duration-100 hover:scale-110'
           >Ingresar a partida con código
          </button>
        </NavLink>
    </div>
  )
}
