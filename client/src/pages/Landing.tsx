import { Header } from "../components/Header";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Escola, Item } from "../interfaces";
import { procurarEscola, converterEscolas } from "../functions";
import { MobileNav } from "../components/MobileNav";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ModalReclamação } from "../components/ModalReclamação";

export default function Landing() {
  const escolas: Escola[] | undefined = useLoaderData() as Escola[];
  const [modalAberto, setModalAberto] = useState(false);
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const navigate = useNavigate();

  if (!escolas) return <div></div>;
  const items = converterEscolas(escolas);

  return (
    <div className="w-full h-full flex-col flex">
      <Header>
        {/* Pesquisa desktop */}
        <div className="place-content-around left-0 pointer-events-none absolute w-full flex h-10 invisible md:visible">
          <div className="lg:w-4/12 xl:w-2/5 mx-auto">
            <div className="items-center invisible lg:visible">
              <ReactSearchAutocomplete
                styling={{ fontFamily: "Poppins" }}
                placeholder="Procure uma escola..."
                showNoResultsText={
                  items.length > 0 ? "Escola não encontrada." : "Carregando..."
                }
                className="self-center pointer-events-auto mt-10 w-full md:mt-0 bottom-0.5 mx-auto"
                items={items}
                fuseOptions={{ keys: ["name"] }}
                onSelect={(item: Item) => {
                  navigate("/escola", {
                    state: { escola: procurarEscola(item.name, escolas) },
                  });
                }}
                formatResult={(item: Item) => {
                  return <h2>{item.name}</h2>;
                }}
              />
            </div>
          </div>
        </div>
      </Header>
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
              onClick={() => setModalAberto(true)}
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
      <ModalReclamação setModalAberto={setModalAberto} modalAberto={modalAberto} items={items} />

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
