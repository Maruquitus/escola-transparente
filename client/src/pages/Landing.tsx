import { Header } from "../components/Header";
import { MobileNav } from "../components/MobileNav";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ModalNovaReclamação } from "../components/ModalNovaReclamação";
import { useLoaderData, useLocation } from "react-router-dom";
import { converterEscolas } from "../functions";
import { Escola } from "../interfaces";

export default function Landing() {
  const [modalAberto, setModalAberto] = useState(false);
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const [erro, setErro] = useState<null | string>();
  const [alertaExibido, setExibido] = useState(false);
  const location = useLocation();
  const escolas = useLoaderData() as Escola[];
  const items = converterEscolas(escolas);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setErro(searchParams.get("erro"));
    if (searchParams.get("sucesso") === "true" && !alertaExibido) {
      setExibido(true);
      alert("Reclamação feita com sucesso!");
    }
    if (searchParams.get("erro") !== null) setModalAberto(true);
  }, [location.search, alertaExibido]);

  return (
    <div className="w-full h-full flex-col flex">
      <Header escolas={escolas} />
      <main className="block h-full w-full ">
        {/* Parte inicial */}
        <div className="md:flex block w-full">
          <div className="md:w-4/5 w-full">
            <h1 className="md:text-5xl text-3xl ml-6 mt-32 font-semibold font-sans text-gray-900">
              Seja bem-vindo à <br className="md:inline hidden" /> Escola{" "}
              <span className="font-semibold font-sans text-blue-500">
                Transparente
              </span>
              !
            </h1>
            <h2 className="md:text-xl text-base font-sans ml-6 mt-2 font-normal text-gray-500">
              Insatisfeito com a infraestrutura de sua escola? Reclame agora
              mesmo!
            </h2>
            <button
              onClick={() => {
                setExibido(false);
                setModalAberto(true);
              }}
              className="h-10 w-48 ml-6 mt-4 select-none bg-blue-500 font-sans hover:bg-[#488cf9] duration-300 font-medium rounded-xl text-white"
            >
              Nova reclamação
            </button>
          </div>
          <div className="w-full h-full md:1/4 py-9 select-none text-center">
            {!imagemCarregada && (
              <Skeleton
                width={"90%"}
                borderRadius={20}
                className="mx-auto mt-10 aspect-[1.8] relative w-32"
              />
            )}
            <img
              alt="Estudantes"
              className="z-0 select-none transition-opacity duration-300"
              src="imagem.jpg"
              style={{ opacity: imagemCarregada ? "1" : "0" }}
              onLoad={() => {
                setImagemCarregada(true);
              }}
            />
          </div>
        </div>
      </main>
      {/* Painel mobile */}
      <MobileNav />
      {/* Modal */}
      <ModalNovaReclamação
        setModalAberto={setModalAberto}
        modalAberto={modalAberto}
        items={items}
        erro={erro}
      />

      <footer className="bottom-1 text-center invisible w-full">
        <a
          className="text-center w-full text-gray-500 font-medium font-sans"
          href="https://br.freepik.com/vetores-gratis/alunos-aprendendo-lingua-estrangeira-com-vocabulario_11235885.htm"
        >
          Imagem de pch.vector no Freepik
        </a>
      </footer>
    </div>
  );
}
