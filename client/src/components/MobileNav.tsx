import { Link, useLocation } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import { checarAutenticação } from "../functions";
import { useNavigate } from "react-router-dom";

export const MobileNav: FC = () => {
  const pathname = useLocation().pathname;
  const [logado, setLogado] = useState(false);
  const [usuário, setUsuário] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    checarAutenticação().then(async (res: [boolean, any]) => {
      setLogado(res[0]);
      if (res[0]) setUsuário(res[1].username);
    });
  }, []);

  return (
    <>
      <div className="lg:hidden h-14 w-full" />

      <div className="lg:hidden select-none flex h-14 w-full bg-blue-500 fixed bottom-0 left-0 z-50 shadow-md shadow-gray-400">
        {!logado && (
          <>
            <Link
              reloadDocument={true}
              to="/login"
              className={`w-1/3 flex h-full ${
                pathname === "/login" ? "bg-[#488cf9]" : "bg-blue-500"
              } border-l border-blue-600`}
            >
              <h2 className="my-auto w-full text-white font-sans font-semibold text-center text-sm">
                <i className="fa-solid fa-right-to-bracket mx-auto text-center mr-1 " />{" "}
                Entrar
              </h2>
            </Link>
            <Link
              reloadDocument={true}
              to="/cadastro"
              className={`w-1/3 flex h-full ${
                pathname === "/cadastro" ? "bg-[#488cf9]" : "bg-blue-500"
              } border-l border-blue-600`}
            >
              <h2 className="my-auto w-full text-white font-sans font-semibold text-center text-sm">
                <i className="fa-solid fa-user-plus mx-auto text-center mr-1 " />{" "}
                Cadastrar
              </h2>
            </Link>
          </>
        )}
        <Link
          reloadDocument={true}
          to="/pesquisa"
          className={`${logado ? "w-1/2" : "w-1/3"} flex h-full ${
            pathname === "/pesquisa" ? "bg-[#488cf9]" : "bg-blue-500"
          } border-l border-blue-600`}
        >
          <h2 className="my-auto w-full text-white font-sans font-semibold text-center text-sm">
            <i className="fa-solid fa-search mx-auto text-center mr-1 " />{" "}
            Pesquisa
          </h2>
        </Link>
        {logado && (
          <div
            className={`my-auto w-1/2 h-full flex items-center border-l border-blue-600`}
          >
            <h2
              onClick={async () => {
                fetch("/api/sair", { method: "POST" }).then(
                  async (res: Response) => {
                    if (res.status === 200) {
                      window.location.reload();
                      navigate("/");
                    }
                  }
                );
              }}
              className="text-white truncate w-full hover:scale-105 duration-300 text-center cursor-pointer font-sans font-semibold text-sm"
            >
              <i className="fa-solid fa-right-from-bracket text-white"></i>{" "}
              {usuário}
            </h2>
          </div>
        )}
      </div>
    </>
  );
};
