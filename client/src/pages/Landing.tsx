import { Header } from "../components/Header";
import { MobileNav } from "../components/MobileNav";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Landing() {
  const [imagemCarregada, setImagemCarregada] = useState(false);
  return (
    <div className="w-full h-full flex-col flex">
      <Header />
      <main className="block h-full w-full ">
        {/* Parte inicial */}
        <div className="md:flex block w-full">
          <div className="md:w-4/5 w-full">
            <h1 className="md:text-5xl text-3xl ml-6 mt-40 font-semibold font-sans text-gray-900">
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
