import { Header } from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { formatarNome, formatarNumeroTelefone } from "../functions";
import { useState, useEffect } from "react";
import { Reclamação } from "../components/Reclamação";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useLoaderData } from "react-router-dom";
import { MobileNav } from "../components/MobileNav";
import { ModalReclamação } from "../components/ModalReclamação";

export default function PáginaEscola() {
  const [reclamação, setReclamação] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [reclamações, setReclamações] = useState<any[] | null>(null);
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [, usuário] = useLoaderData() as [
    boolean,
    { id: string; name: string }
  ];

  useEffect(() => {
    console.log(
      encodeURI(
        `/api/reclamacoes/${state.cidadeId || 2303501}/${state.escola.nome}`
      )
    );
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
        <h1 className="text-left w-4/5 mx-auto font-sans font-semibold text-2xl mt-3">
          {formatarNome(escola.nome)}
        </h1>
        <h2 className="text-left w-4/5 mx-auto font-sans font-medium text-xl">
          {formatarNome(escola.endereco)}
        </h2>
        <h2 className="text-left w-4/5 mx-auto font-sans font-medium text-xl">
          {formatarNumeroTelefone(escola.telefone)}
        </h2>

        <h1 className="text-left w-4/5 mx-auto font-sans font-semibold text-2xl mt-3">
          <FontAwesomeIcon icon={faBullhorn} className="mr-2" />
          Reclamações
        </h1>
        <div className="w-4/5 mx-auto mt-3 mb-10 flex-col gap-4 space-y-2">
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
          {reclamações == null && (
            <div className="w-full border select-none border-gray-100 bg-blue-500 shadow-md p-5 rounded-lg duration-300">
              <Skeleton
                baseColor="rgb(96 165 250)"
                highlightColor="rgb(147 197 253)"
                count={1}
                width="40%"
                className="h-6 mb-2"
              />
              <Skeleton
                baseColor="rgb(96 165 250)"
                highlightColor="rgb(147 197 253)"
                count={2}
                width="50%"
              />
              <div className="float-right -translate-y-4 flex items-center">
                <Skeleton
                  baseColor="rgb(96 165 250)"
                  highlightColor="rgb(147 197 253)"
                  width="15px"
                  className="mr-1"
                />
                <FontAwesomeIcon icon={faHeart} color="white" size="lg" />
              </div>
            </div>
          )}
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
    </div>
  );
}
