import { Header } from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { formatarNome, formatarNumeroTelefone } from "../functions";
import { useState, useEffect } from "react";
import { Reclamação } from "../components/Reclamação";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { useLoaderData } from "react-router-dom";
import { MobileNav } from "../components/MobileNav";
import { ModalReclamação } from "../components/ModalReclamação";
import { ModalNovaReclamação } from "../components/ModalNovaReclamação";
import { PlaceholderReclamação } from "../components/PlaceholderReclamação";

export default function PáginaEscola() {
  const [reclamação, setReclamação] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalNRAberto, setModalNRAberto] = useState(false);
  const [reclamações, setReclamações] = useState<any[] | null>(null);
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const [alertaExibido, setExibido] = useState(false);
  const [erro, setErro] = useState<null | string>();
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const [, usuário] = useLoaderData() as [
    boolean,
    { id: string; name: string }
  ];
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setErro(searchParams.get("erro"));
    if (
      searchParams.get("sucesso") === "true" &&
      !alertaExibido &&
      !modalAberto
    ) {
      setExibido(true);
      alert("Reclamação feita com sucesso!");
    }
    if (searchParams.get("erro") !== null) setModalAberto(true);
  }, [location.search, alertaExibido, modalAberto]);

  useEffect(() => {
    fetch(
      encodeURI(
        `/api/reclamacoes/${state.cidadeId || 2303501}/${state.escola.nome}`
      ), //Adicionar conexão para pegar o campo do id da cidade
      {}
    ).then(async (res) => {
      setTimeout(async () => {
        setReclamações(await res.json());
      }, 500);
    });
  }, [state]);
  if (state === null) {
    navigate("/");
    return <div></div>;
  }
  const escola = state.escola;

  const submitReclamação = async (info: FormData) => {
    const res = await fetch("/api/novaReclamacao", {
      body: info,
      method: "POST",
    });
    const texto = await res.text();
    if (res.status === 400) {
      setErro(texto);
    } else {
      setModalNRAberto(false);
    }
    return res;
  };

  return (
    <div className="w-full h-full flex-col flex">
      <Header />
      <main className="block h-full w-full">
        <div className="bg-gray-200 rounded-2xl py-16 mx-auto w-10/12 h-80 mt-4">
          <img
            alt="Ícone escola"
            onLoad={() => {
              setImagemCarregada(true);
            }}
            className={
              "mx-auto sm:scale-100 scale-75 transition-opacity duration-300 " +
              (imagemCarregada ? "opacity-1" : "opacity-0")
            }
            src="escola.png"
          />
        </div>
        <div className="flex md:flex-row flex-col md:place-content-between w-10/12 mx-auto">
          <div>
            <h1 className="font-sans font-semibold text-2xl mt-3">
              {formatarNome(escola.nome)}
            </h1>
            <h2 className="font-sans font-medium text-xl">
              {formatarNome(escola.endereco)}
            </h2>
            <h2 className="font-sans font-medium text-xl">
              {formatarNumeroTelefone(escola.telefone)}
            </h2>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => {
                setModalNRAberto(true);
                setExibido(false);
              }}
              className="h-10 w-48 md:mt-4 select-none bg-blue-500 font-sans hover:bg-[#488cf9] duration-300 font-medium rounded-xl text-white"
            >
              Nova reclamação
            </button>
          </div>
        </div>

        <h1 className="w-10/12 mx-auto font-sans font-semibold text-2xl mt-3">
          <FontAwesomeIcon icon={faBullhorn} className="mr-2" />
          Reclamações
        </h1>
        <div className="w-10/12 mx-auto mt-3 mb-10 flex-col gap-4 space-y-2">
          {reclamações?.length === 0 && (
            <div>
              <p className="font-regular text-gray-500 font-sans text-lg items-center">
                Nenhuma reclamação por enquanto!
                <FontAwesomeIcon
                  icon={faSmile}
                  className="ml-1 mt-0.5 inline-flex"
                />
              </p>
            </div>
          )}
          {reclamações == null && <PlaceholderReclamação />}
          {reclamações &&
            reclamações
              .sort((a, b) => b.curtidas - a.curtidas)
              .map((rec: any) => {
                return (
                  <Reclamação
                    key={rec._id}
                    reclamação={rec}
                    usuário={usuário?.id}
                    setModalAberto={setModalAberto}
                    setReclamação={setReclamação}
                    curtidas={rec.curtidas}
                  />
                );
              })}
        </div>
      </main>
      <ModalReclamação
        setModalAberto={setModalAberto}
        modalAberto={modalAberto}
        reclamação={reclamação}
        setReclamação={setReclamação}
      />
      <MobileNav />
      {/* Modal */}
      <ModalNovaReclamação
        submit={submitReclamação}
        setModalAberto={setModalNRAberto}
        modalAberto={modalNRAberto}
        erro={erro}
        escola={state.escola.nome}
      />
    </div>
  );
}
