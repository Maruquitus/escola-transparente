import { ReactNode, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { routeTitles } from "../routeTitles";

export const Header: FC<{
  children?: ReactNode;
  customClass?: string;
  logado?: boolean;
  usuário?: string;
}> = (props) => {
  const pathname: string = useLocation().pathname;
  const navigate = useNavigate();
  const título: string = routeTitles[pathname];
  let logado = props.logado;
  let usuário = props.usuário;
  if (logado === undefined) logado = false;

  document.title = `${título ? título : "404"} | Escola Transparente`;

  return (
    <header
      className={
        "bg-blue-500 select-none z-10 w-full py-5 px-10 shadow-md shadow-gray-200 flex " +
        props.customClass
      }
    >
      <Link
        reloadDocument={pathname !== "/"}
        to="/"
        className={`text-slate-900 flex ${
          pathname !== "/"
            ? "cursor-pointer hover:scale-105 duration-150"
            : "cursor-default"
        } whitespace-nowrap mt-1 w-3/5 md:w-fit font-semibold font-sans text-xl xl:text-2xl mb-1`}
      >
        <img
          src="/logo192.png"
          className="w-14 h-14 -mt-4 -mb-3 mr-1 aspect-square"
          alt="logo"
        />
        Escola{" "}
        <span className="font-bold text-xl xl:text-2xl text-white ml-2">
          Transparente
        </span>
      </Link>
      {props.children}
      {logado && (
        <div
          className={`ml-auto ${!props.children && "-mr-1"} h-8 hidden md:flex`}
        >
          <h2
            onClick={async () => {
              fetch("/api/sair", { method: "POST" }).then(async (res: Response) => {
                if (res.status == 200) {
                  window.location.reload();
                  navigate('/'); 
                }
              });
            }}
            className="text-white hover:scale-105 duration-300 cursor-pointer font-semibold text-lg mt-1.5"
          >
            <i className="fa-solid fa-right-from-bracket text-white"></i>{" "}
            {usuário}
          </h2>
        </div>
      )}
      {!logado && (
        <div
          className={`ml-auto ${
            !props.children && "-mr-1"
          } w-60 space-x-3 h-8 hidden md:flex`}
        >
          <Link
          reloadDocument={true}
          to="/login"
            onClick={() => {window.location.reload(); navigate("/login")}}
            className={`h-10 w-28 lg:visible invisible ${
              pathname === "/login" && "bg-[#488cf9]"
            } border-white border hover:bg-[#488cf9] duration-300 text-center text-white font-sans font-semibold rounded-xl`}
          >
            <span className="mt-[0.45rem] block">Entrar</span>
          </Link>
          <Link
          reloadDocument={true}
          to="/cadastro"
            className={`h-10 w-28 lg:visible invisible ${
              pathname === "/cadastro" ? "bg-white" : "bg-slate-100"
            } font-sans hover:bg-white duration-300 text-center font-semibold rounded-xl text-slate-700`}
          >
            <span className="mt-[0.45rem] block">Cadastrar</span>
          </Link>
        </div>
      )}
    </header>
  );
};
