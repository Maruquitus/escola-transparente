import { useLocation, useNavigate } from "react-router-dom";
import { FC } from "react";

export const MobileNav: FC = (props) => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  return (
    <div className="md:hidden select-none flex h-14 w-full bg-blue-500 fixed bottom-0 left-0 z-50 shadow-md shadow-gray-400">
      <div
        onClick={() =>
          navigate("/login")
        }
        className={`w-1/3 flex h-full ${pathname === '/login' ? 'bg-[#488cf9]' : 'bg-blue-500'} border-l border-blue-600`}
      >
        <h2 className="my-auto w-full text-white font-sans font-semibold text-center text-sm">
          <i className="fa-solid fa-right-to-bracket mx-auto text-center mr-1 " />{" "}
          Entrar
        </h2>
      </div>
      <div
        onClick={() =>
          navigate("/cadastro")
        }
        className={`w-1/3 flex h-full ${pathname === '/cadastro' ? 'bg-[#488cf9]' : 'bg-blue-500'} border-l border-blue-600`}
      >
        <h2 className="my-auto w-full text-white font-sans font-semibold text-center text-sm">
          <i className="fa-solid fa-user-plus mx-auto text-center mr-1 " />{" "}
          Cadastrar
        </h2>
      </div>
      <div
        onClick={() =>
          navigate("/pesquisa")
        }
        className={`w-1/3 flex h-full ${pathname === '/pesquisa' ? 'bg-[#488cf9]' : 'bg-blue-500'} border-l border-blue-600`}
      >
        <h2 className="my-auto w-full text-white font-sans font-semibold text-center text-sm">
          <i className="fa-solid fa-search mx-auto text-center mr-1 " />{" "}
          Pesquisa
        </h2>
      </div>
    </div>
  );
};
