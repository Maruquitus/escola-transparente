import { ReactNode, FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { routeTitles } from "../routeTitles";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Escola, Item } from "../interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";
import {
  procurarEscola,
  converterEscolas,
  carregarEscolas,
  checarAutenticação,
} from "../functions";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

export const Header: FC<{
  children?: ReactNode;
  customClass?: string;
  escolas?: Escola[];
  adm?: boolean;
  handleSetAdm?: Function;
}> = (props) => {
  const pathname: string = useLocation().pathname;
  const navigate = useNavigate();
  const título: string = routeTitles[pathname];
  const [logado, setLogado] = useState(false);
  const [usuário, setUsuário] = useState();
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    checarAutenticação().then(async (res: [boolean, any]) => {
      setLogado(res[0]);
      setCarregado(true);
      if (res[0]) setUsuário(res[1].username);
    });
    if (props.escolas !== undefined) {
      setEscolas(props.escolas);
      setItems(converterEscolas(props.escolas));
    } else {
      carregarEscolas().then((escolas) => {
        setEscolas(escolas);
        setItems(converterEscolas(escolas));
      });
    }
  }, [props.escolas]);

  const [escolas, setEscolas] = useState<Escola[]>([]);
  const [items, setItems] = useState<Item[]>([]);

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
      {/* Pesquisa desktop */}
      <div className="place-content-around left-0 pointer-events-none absolute w-full flex h-10 invisible md:visible">
        <div className="lg:w-4/12 xl:w-2/5 mx-auto">
          <div className="items-center invisible lg:visible">
            <ReactSearchAutocomplete
              styling={{ fontFamily: "Poppins", zIndex: 50 }}
              placeholder="Procure uma escola..."
              showNoResultsText={
                items.length > 0 ? "Escola não encontrada." : "Carregando..."
              }
              className="self-center pointer-events-auto mt-10 w-full md:mt-0 bottom-0.5 mx-auto"
              items={items}
              fuseOptions={{ keys: ["name"] }}
              onSelect={async (item: Item) => {
                const escola = await procurarEscola(item.name, escolas);
                if (escola) {
                  navigate("/escola", {
                    state: { escola: await procurarEscola(item.name, escolas) },
                  });
                }
              }}
              formatResult={(item: Item) => {
                return <h2>{item.name}</h2>;
              }}
            />
          </div>
        </div>
      </div>
      {!carregado && (
        <Skeleton
          baseColor="rgb(96 165 250)"
          highlightColor="rgb(147 197 253)"
          containerClassName="ml-auto w-60 my-auto -mt-2 -mb-2 md:block hidden"
          className="h-12"
        />
      )}
      {logado && carregado && (
        <div className={`ml-auto h-8 hidden md:flex`}>
          {pathname === "/home" && (
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  props.handleSetAdm?.(!props.adm);
                }}
                className={`rounded-md my-auto mt-1 flex font-sans font-semibold text-white w-8 h-8 ${
                  props.adm
                    ? "bg-white"
                    : "bg-transparent border-solid border border-white"
                } cursor-pointer`}
              >
                <FontAwesomeIcon
                  className={"m-auto " + (props.adm && "text-slate-700")}
                  icon={faUserTie}
                />
              </button>
              <h2
                onClick={async () => {
                  fetch("/api/sair", { method: "POST" }).then(
                    async (res: Response) => {
                      if (res.status === 200) {
                        navigate("/login");
                        window.location.reload();
                      }
                    }
                  );
                }}
                className="text-white font-sans hover:scale-105 duration-300 cursor-pointer font-semibold truncate text-lg mt-1.5"
              >
                <i className="fa-solid fa-right-from-bracket mr-1 text-white"></i>{" "}
                Sair
              </h2>
            </div>
          )}
          {pathname !== "/home" && (
            <h2
              onClick={() => navigate("/home")}
              className="text-white font-sans hover:scale-105 duration-300 cursor-pointer font-semibold truncate text-lg mt-1.5"
            >
              <i className="fa-solid fa-user mr-1 text-white"></i> {usuário}
            </h2>
          )}
        </div>
      )}
      {!logado && carregado && (
        <div
          className={`ml-auto ${
            !props.children && "-mr-1"
          } w-60 space-x-3 h-8 hidden md:flex`}
        >
          <Link
            reloadDocument={true}
            to="/login"
            onClick={() => {
              window.location.reload();
              navigate("/login");
            }}
            className={`h-10 w-28 lg:visible invisible ${
              pathname === "/login" && "bg-[#488cf9]"
            } border-white border hover:bg-[#488cf9] duration-300 text-center text-white font-sans font-semibold rounded-xl flex items-center justify-center`}
          >
            <span>Entrar</span>
          </Link>
          <Link
            reloadDocument={true}
            to="/cadastro"
            className={`h-10 w-28 lg:visible invisible ${
              pathname === "/cadastro" ? "bg-white" : "bg-slate-100"
            } font-sans hover:bg-white duration-300 text-center font-semibold rounded-xl text-slate-700 flex items-center justify-center`}
          >
            <span>Cadastrar</span>
          </Link>
        </div>
      )}
    </header>
  );
};
