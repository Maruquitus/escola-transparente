import { useEffect } from "react";
import { Header } from "../components/Header";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MobileNav } from "../components/MobileNav";
import { Reclamação } from "../components/Reclamação";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngry, faSmile } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { PlaceholderReclamação } from "../components/PlaceholderReclamação";
import SVG from "../assets/thinking.svg";
import { placeholder } from "../placeholderData";
const adm = false;

export default function Home() {
  const navigate = useNavigate();
  const [logado] = useLoaderData() as [boolean, any];
  const [reclamações, setReclamações] = useState<Array<any>>(
    adm ? placeholder : []
  );
  const [carregado, setCarregado] = useState(adm);

  useEffect(() => {
    if (!adm) {
      fetch("/api/reclamacoesUsuario").then(async (res) => {
        if (res.status === 200) {
          const resultado = await res.json();
          setReclamações(resultado);
        }
        setCarregado(true);
      });
    }
    if (!logado) navigate("/login");
  }, [logado, navigate]);

  if (logado == null) return <div></div>;

  return (
    <div>
      <Header />
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
          {adm && (
            <h1 className="font-sans font-bold text-3xl text-gray-900 mb-2">
              Reclamações recentes na{" "}
              <span className="font-semibold font-sans text-blue-500">
                EEEP Edson Queiroz
              </span>
            </h1>
          )}
          {reclamações?.length === 0 && carregado && (
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
              <img
                className="ml-auto w-full mt-10 md:-mt-32 md:w-7/12"
                src={SVG}
                alt=""
              />
            </div>
          )}
          {reclamações?.length > 0 && carregado && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 h-72 overflow-y-scroll gap-y-2 w-full rounded-lg">
              {!carregado &&
                Array.from({ length: 4 }).map(() => {
                  return <PlaceholderReclamação />;
                })}
              {carregado &&
                reclamações.map((rec) => {
                  return (
                    <Reclamação
                      curtidas={parseInt(rec.curtidas)}
                      reclamação={rec}
                    />
                  );
                })}
            </div>
          )}
          {adm && (
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
