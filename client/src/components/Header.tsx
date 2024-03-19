import { ReactNode, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Header: FC<{ children?: ReactNode; customClass?: string}> = (
  props
) => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  return (
    <header
      className={
        "bg-blue-500 select-none z-10 w-full py-5 px-10 shadow-md shadow-gray-200 flex " +
        props.customClass
      }
    >
      <Link
        to="/"
        className="text-slate-900 cursor-pointer hover:scale-105 duration-150 whitespace-nowrap mt-1 font-semibold font-sans text-2xl mb-1 md:float-start"
      >
        Escola <span className="font-bold text-white">transparente</span>
      </Link>
      {props.children}
      <div className={`ml-auto ${!props.children && "-mr-1"} w-60 space-x-3 h-8 hidden md:flex`}>
        <button onClick={() => navigate("/login")} className={`h-10 w-28 md:visible invisible ${pathname === '/login' && "bg-[#488cf9]"} border-white border hover:bg-[#488cf9] duration-300 text-white font-sans font-semibold rounded-xl`}>
        Entrar
        </button>
        <button  onClick={() => navigate("/signup")}  className={`h-10 w-28 md:visible invisible ${pathname === '/signup' ?  "bg-white" : "bg-slate-100"} font-sans hover:bg-white duration-300 font-semibold rounded-xl text-slate-700`}>
        Cadastrar
        </button>
      </div>
    </header>
  );
};
