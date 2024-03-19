import React from "react";
import { Header } from "../components/Header";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Escola } from "../interfaces";
import { formatar } from "../functions";
import { MobileNav } from "../components/MobileNav";

export default function Landing() {
  const [escolas, setEscolas] = React.useState<Escola[]>([]);
  React.useEffect(() => {
    fetch("http://localhost:3001/api").then(async (res: Response) => {
      const data: Escola[] = await res.json();
      setEscolas(data);
    });
  }, []);

  return (
    <div className="w-full h-full flex-col flex">
      <Header>
        {/* Pesquisa desktop */}
        <div className="place-content-around w-4/5 flex h-10 invisible md:visible">
          <form autoComplete="off" className="w-full">
            <div className="items-center md:visible">
              <ReactSearchAutocomplete
                styling={{ fontFamily: "Poppins" }}
                placeholder="Procure uma escola..."
                showNoResultsText={escolas.length > 0 ? "Escola não encontrada." : "Carregando..."}
                className="self-center mt-10 w-full md:w-4/5 md:mt-0 bottom-0.5 mx-auto"
                items={escolas}
                fuseOptions={{ keys: ["nome"] }}
                onSelect={() => {}}
                onSearch={() => {}}
                formatResult={formatar}
              />
            </div>
          </form>
        </div>
      </Header>

      <main className="block h-full w-full ">
        {/* Parte inicial */}
        <div className="md:flex block w-full">
          <div className="md:w-4/5 w-full">
            <h1 className="md:text-5xl text-3xl ml-6 mt-32 font-semibold font-sans text-gray-900">
              Seja bem-vindo à <br className="md:inline hidden" /> Escola{" "}
              <span className="font-semibold font-sans text-blue-500">
                transparente
              </span>
              !
            </h1>
            <h2 className="md:text-xl text-base font-sans ml-6 mt-2 font-normal text-gray-500">
              Insatisfeito com a infraestrutura de sua escola? Reclame agora
              mesmo!
            </h2>
            <button className="h-10 w-48 ml-6 mt-4 select-none bg-blue-500 font-sans hover:bg-[#488cf9] duration-300 font-medium rounded-md text-white">
              Nova reclamação
            </button>
          </div>
          <div className="w-full h-full md:1/4 py-9 select-n  e">
            <img
              alt="Estudantes"
              className="z-0 select-none"
              src="imagem.jpg"
            />
          </div>
        </div>
        <div></div>
      </main>
      {/* Painel mobile */}
      <MobileNav/>
      
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