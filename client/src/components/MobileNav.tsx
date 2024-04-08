import { Link, useLocation } from "react-router-dom";
import { FC } from "react";

export const MobileNav: FC = () => {
  const pathname = useLocation().pathname;
  return (
    <div className="lg:hidden select-none flex h-14 w-full bg-blue-500 fixed bottom-0 left-0 z-50 shadow-md shadow-gray-400">
      <Link
      reloadDocument={true}
      to="/login"
        className={`w-1/3 flex h-full ${pathname === '/login' ? 'bg-[#488cf9]' : 'bg-blue-500'} border-l border-blue-600`}
      >
        <h2 className="my-auto w-full text-white font-sans font-semibold text-center text-sm">
          <i className="fa-solid fa-right-to-bracket mx-auto text-center mr-1 " />{" "}
          Entrar
        </h2>
      </Link>
      <Link
      reloadDocument={true}
      to="/cadastro"
        className={`w-1/3 flex h-full ${pathname === '/cadastro' ? 'bg-[#488cf9]' : 'bg-blue-500'} border-l border-blue-600`}
      >
        <h2 className="my-auto w-full text-white font-sans font-semibold text-center text-sm">
          <i className="fa-solid fa-user-plus mx-auto text-center mr-1 " />{" "}
          Cadastrar
        </h2>
      </Link>
      <Link
      reloadDocument={true}
      to="/pesquisa"
        className={`w-1/3 flex h-full ${pathname === '/pesquisa' ? 'bg-[#488cf9]' : 'bg-blue-500'} border-l border-blue-600`}
      >
        <h2 className="my-auto w-full text-white font-sans font-semibold text-center text-sm">
          <i className="fa-solid fa-search mx-auto text-center mr-1 " />{" "}
          Pesquisa
        </h2>
      </Link>
    </div>
  );
};
