import { ReactNode, FC } from "react";
import { Link } from "react-router-dom";

export const Header: FC<{ children?: ReactNode, customClass?: string }> = (props) => {
    return (
        <header className={"bg-white z-10 w-full py-5 px-10 shadow-md shadow-gray-200 flex " + props.customClass}>
        <Link to='/' className="text-black cursor-pointer hover:scale-105 duration-150 whitespace-nowrap mt-1 font-semibold font-sans text-2xl mb-1 md:float-start">
          Escola <span className="font-bold text-blue-500">transparente</span>
        </Link>
        {props.children}
        <div className="place-content-around ml-auto w-60 space-x-3 flex h-8 invisible md:visible">
          <button className="h-10 w-28 md:visible invisible border-blue-500 border hover:bg-blue-600 duration-300 hover:text-white font-sans font-semibold rounded-md text-blue-500">
            Entrar
          </button>
          <button className="h-10 w-28 md:visible invisible bg-blue-500 font-sans hover:bg-blue-600 duration-300 font-semibold rounded-md text-white">
            Cadastrar
          </button>
        </div>
      </header>
    )
}