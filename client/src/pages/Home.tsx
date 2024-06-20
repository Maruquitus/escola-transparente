import { useEffect, useState, useCallback } from "react";
import { Header } from "../components/Header";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MobileNav } from "../components/MobileNav";
import { Reclamação } from "../components/Reclamação";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngry, faSmile } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PlaceholderReclamação } from "../components/PlaceholderReclamação";
import SVG from "../assets/thinking.svg";

let primeiraVez = true;
export default function Home() {
  const navigate = useNavigate();
  const [logado] = useLoaderData() as [boolean, any];
  const [adm, setADM] = useState(false);
  const [reclamações, setReclamações] = useState<Array<any>>([]);
  const [carregado, setCarregado] = useState(false);
  const [imagemCarregada, setImagemCarregada] = useState(false);

  const handleSetADM = (adm: boolean) => {
    if (primeiraVez) primeiraVez = false;
    setADM(adm);
    setCarregado(false);
    setTimeout(carregarReclamações, 500);
  };

  const carregarReclamações = useCallback(async () => {
    if (!adm) {
      await fetch(
        encodeURI(`/api/reclamacoes/2303501/EEEP EDSON QUEIROZ`)
      ).then(async (res) => {
        if (res.status === 200) {
          const resultado = await res.json();
          setReclamações(resultado);
        }
      });
    } else {
      await fetch("/api/reclamacoesUsuario").then(async (res) => {
        if (res.status === 200) {
          const resultado = await res.json();
          setReclamações(resultado);
        }
      });
    }
    setCarregado(true);
  }, [adm]);

  useEffect(() => {
    const img = new Image();
    img.src = SVG;
    img.onload = () => {
      setImagemCarregada(true);
    };
    if (primeiraVez) {
      carregarReclamações();
    }
    if (!logado) navigate("/login");
  }, [adm, logado, navigate, carregarReclamações]);

  if (logado == null || logado === false) return <div></div>;

  return (
    <div>
      <Header adm={adm} handleSetAdm={handleSetADM} />
      <main className="block h-full ">
        <div className="mx-10 mt-20">
          {!adm && (
            <h1
              className={`font-sans font-bold text-3xl text-gray-900 mb-2 ${
                reclamações?.length === 0 && carregado && "md:mt-40"
              }`}
            >
              Minhas reclamações
            </h1>
          )}
          {adm && !carregado && (
            <Skeleton
              baseColor="lightgray"
              highlightColor="#eee"
              containerClassName="flex w-1/2 h-16 -mt-6"
              className="inline mt-5 mb-2"
            />
          )}
          {adm && carregado && (
            <h1 className="font-sans font-bold text-3xl text-gray-900 mb-2">
              Reclamações recentes na{" "}
              <span className="font-semibold font-sans text-blue-500">
                EEEP Edson Queiroz
              </span>
            </h1>
          )}
          {!adm && reclamações?.length === 0 && carregado && (
            <div className="mx-auto md:flex w-full h-full">
              <div>
                <p className="font-regular text-gray-500 font-sans text-lg items-center">
                  Suas reclamações serão exibidas aqui! <br />
                  Pesquise uma escola para fazer sua primeira reclamação.
                  <FontAwesomeIcon
                    icon={faSmile}
                    className="ml-1 mt-0.5 inline-flex"
                  />
                </p>
              </div>
              <div className="ml-auto h-full mt-10 md:-mt-[7.75rem] md:w-8/12">
                {!imagemCarregada && (
                  <Skeleton
                    width={"90%"}
                    height={"100%"}
                    borderRadius={20}
                    className="aspect-[1.8] ml-20 relative"
                  />
                )}
                <img
                  className="h-full w-full"
                  src={SVG}
                  alt="Thinking"
                  style={{ opacity: imagemCarregada ? "1" : "0" }}
                  onLoad={() => setImagemCarregada(true)}
                />
              </div>
            </div>
          )}
          {(reclamações?.length > 0 || !carregado) && (
            <div className="grid grid-cols-1 items-stretch md:grid-cols-2 gap-x-4 h-72 overflow-y-scroll gap-y-2 w-full rounded-lg">
              {!carregado &&
                Array.from({ length: 4 }).map((_, index) => (
                  <PlaceholderReclamação key={index} />
                ))}
              {carregado &&
                reclamações.map((rec) => (
                  <Reclamação
                    adm={adm}
                    key={rec.id}
                    curtidas={parseInt(rec.curtidas)}
                    reclamação={rec}
                  />
                ))}
            </div>
          )}
          {adm && !carregado && (
            <>
              <Skeleton
                baseColor="lightgray"
                highlightColor="#eee"
                containerClassName="flex w-1/3 h-16"
                className="inline mt-5"
              />
              <Skeleton
                baseColor="lightgray"
                highlightColor="#eee"
                containerClassName="flex w-1/2 h-8"
                className="inline mt-1"
              />
            </>
          )}
          {adm && carregado && (
            <h1 className="font-sans font-bold text-3xl text-gray-900 mb-2 mt-2">
              Sua reputação é{" "}
              <span className="font-semibold font-sans text-red-700">
                Insatisfatória
                <FontAwesomeIcon className="ml-2 text-red-700" icon={faAngry} />
              </span>
              <p className="font-sans font-medium text-2xl text-gray-900 mb-2 mt-2">
                <span className="font-sans font-semibold text-red-700">
                  87,6%
                </span>{" "}
                das reclamações insatisfatórias.
              </p>
            </h1>
          )}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
