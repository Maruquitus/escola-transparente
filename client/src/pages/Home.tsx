import { useEffect } from "react";
import { Header } from "../components/Header";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MobileNav } from "../components/MobileNav";
import { Reclamação } from "../components/Reclamação";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngry } from "@fortawesome/free-solid-svg-icons";

const adm = true;

const placeholder = [
  {
    _id: "666322aef219df08d2c1e0f3",
    cidadeId: "2303501",
    escola: "JOÃO PAULO II EEBM",
    título: "Má administração",
    textoReclamação:
      "A escola está mal administrada, falta de recursos básicos.",
    fotos: "[]",
    status: "Não respondida",
    curtidas: "0",
  },
  {
    _id: "666322aef219df08d2c1e0f4",
    cidadeId: "2303501",
    escola: "MARIA MONTESSORI EEBM",
    título: "Professores despreparados",
    textoReclamação:
      "Os professores não estão preparados, muitas reclamações sobre didática.",
    fotos: "",
    status: adm ? "Resposta satisfatória" : "Não respondida",
    curtidas: "2",
  },
  {
    _id: "666322aef219df08d2c1e0f5",
    cidadeId: "2303501",
    escola: "PEDRO ALVARES CABRAL EEBM",
    título: "Estrutura precária",
    textoReclamação:
      "A estrutura da escola está precária, necessitando de reparos urgentes.",
    fotos: "[",
    status: "Não respondida",
    curtidas: "1",
  },
  {
    _id: "666322aef219df08d2c1e0f6",
    cidadeId: "2303501",
    escola: "DOM BOSCO EEBM",
    título: "Falta de segurança",
    textoReclamação:
      "A segurança na escola é insuficiente, vários incidentes relatados.",
    fotos: "",
    status: adm ? "Resposta satisfatória" : "Não respondida",
    curtidas: "3",
  },
  {
    _id: "666322aef219df08d2c1e0f7",
    cidadeId: "2303501",
    escola: "ANITA GARIBALDI EEBM",
    título: "Merenda escolar ruim",
    textoReclamação:
      "A qualidade da merenda escolar é muito baixa, as crianças não estão se alimentando bem.",
    fotos: "",
    status: adm ? "Resposta satisfatória" : "Não respondida",
    curtidas: "0",
  },
  {
    _id: "666322aef219df08d2c1e0f8",
    cidadeId: "2303501",
    escola: "TIRADENTES EEBM",
    título: "Atendimento precário",
    textoReclamação:
      "O atendimento administrativo é muito lento e desorganizado.",
    fotos: "[",
    status: "Não respondida",
    curtidas: "4",
  },
  {
    _id: "666322aef219df08d2c1e0f9",
    cidadeId: "2303501",
    escola: "SÃO FRANCISCO EEBM",
    título: "Limpeza inadequada",
    textoReclamação:
      "A limpeza da escola é inadequada, várias salas de aula sujas.",
    fotos: "[].",
    status: adm ? "Resposta satisfatória" : "Não respondida",
    curtidas: "1",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [logado] = useLoaderData() as [boolean, any];

  useEffect(() => {
    if (!logado) navigate("/login");
  }, [logado, navigate]);

  if (logado == null) return <div></div>;

  return (
    <div>
      <Header />
      <main className="block h-full ">
        <div className="mx-10 mt-20">
          {!adm && (
            <h1 className="font-sans font-bold text-3xl text-gray-900 mb-2">
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
          <div className="grid grid-cols-2 gap-x-4 h-72 overflow-y-scroll gap-y-2 w-full rounded-lg">
            {placeholder.map((rec) => {
              return (
                <Reclamação
                  curtidas={parseInt(rec.curtidas)}
                  reclamação={rec}
                />
              );
            })}
          </div>
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
