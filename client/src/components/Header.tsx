import { ReactNode, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { routeTitles } from "../routeTitles";

export const Header: FC<{ children?: ReactNode; customClass?: string}> = (
  props
) => {
  const pathname: string = useLocation().pathname;
  const navigate = useNavigate();
  const title: string = routeTitles[pathname];
  
  document.title = `${title ? title : "404"} | Escola Transparente`;

  return (
    <header
      className={
        "bg-blue-500 select-none z-10 w-full py-5 px-10 shadow-md shadow-gray-200 flex " +
        props.customClass
      }
    >
      <Link
        to="/"
        className="text-slate-900 flex cursor-pointer hover:scale-105 duration-150 whitespace-nowrap mt-1 font-semibold font-sans text-2xl mb-1 md:float-start"
      >
      <img src="logo192.png" className="w-14 h-14 -mt-4 -mb-3 mr-1 aspect-square"/>
        Escola <span className="font-bold text-white ml-2">Transparente</span>
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
