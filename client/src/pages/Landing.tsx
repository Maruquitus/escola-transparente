import { Header } from "../components/Header";
import { MobileNav } from "../components/MobileNav";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Plataforma from "../assets/plataforma.svg";
import Funcionamento from "../assets/funcionamento.svg";
import Seguranca from "../assets/seguranca.svg";
import Anonimo from "../assets/anonimo.svg";

export default function Landing() {
  const [imagemCarregada, setImagemCarregada] = useState(false);
  return (
    <div className="w-full h-full flex-col flex">
      <Header />
      <main className="block h-full w-full ">
        {/* Parte inicial */}
        <section className="md:flex block w-full">
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
          <div className="w-full h-full py-9 select-none text-center">
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
        </section>

        <section className="md:flex md:w-full w-4/5 mx-auto flex-row-reverse block">
          <div className="md:w-4/5 my-auto mx-auto md:mr-20">
            <h1 className="md:text-4xl text-2xl font-semibold font-sans text-gray-900 md:text-right text-center w-full">
              Por que usar a plataforma?
            </h1>
            <h2 className="md:text-2xl text-base md:text-right text-center font-sans mt-2 font-normal text-gray-500">
              Nossa plataforma permite denunciar problemas nas escolas de forma
              simples e anônima, promovendo transparência e responsabilidade.
              Avalie respostas das autoridades e ajude a identificar áreas que
              necessitam de intervenção urgente.
            </h2>
          </div>
          <div className="w-full h-full py-9 select-none text-center items-center align-middle">
            <img
              alt="Feedback"
              className="z-0 select-none transition-opacity duration-300 md:ml-20 w-full h-auto mx-auto md:h-[21rem] my-auto"
              src={Plataforma}
              style={{ opacity: imagemCarregada ? "1" : "0" }}
              onLoad={() => {
                setImagemCarregada(true);
              }}
            />
          </div>
        </section>

        <section className="md:flex block w-4/5 mx-auto">
          <div className="md:w-4/5 w-full my-auto mx-auto md:ml-20">
            <h1 className="md:text-4xl text-2xl font-semibold font-sans text-gray-900 md:text-left text-center w-full">
              Como funciona
            </h1>
            <h2 className="md:text-2xl text-base md:text-left text-center font-sans mt-2 font-normal text-gray-500">
              Todas as suas denúncias são publicadas, permitindo transparência e
              acompanhamento das respostas das autoridades verificadas.
              Acompanhe o progresso e participe da transformação das escolas.
            </h2>
          </div>
          <div className="w-full h-full py-9 select-none text-center items-center align-middle">
            <img
              alt="Funcionamento"
              className="z-0 select-none transition-opacity duration-300 md:ml-20 w-full h-auto mx-auto md:h-[21rem] my-auto"
              src={Funcionamento}
              style={{ opacity: imagemCarregada ? "1" : "0" }}
              onLoad={() => {
                setImagemCarregada(true);
              }}
            />
          </div>
        </section>

        <section className="md:flex flex-row-reverse block w-4/5 mx-auto">
          <div className="md:w-4/5 w-full my-auto mx-auto md:mr-20">
            <h1 className="md:text-4xl text-2xl font-semibold font-sans text-gray-900 md:text-right text-center w-full">
              Segurança
            </h1>
            <h2 className="md:text-2xl text-base md:text-right text-center font-sans mt-2 font-normal text-gray-500">
              As autoridades associadas às instituições passam por um processo
              rigoso de autenticação. Nele, os funcionários da nossa plataforma
              verificam a identidade dos gestores manualmente, visando garantir
              a segurança e integridade do nosso site.
            </h2>
          </div>
          <div className="w-full h-full py-9 select-none text-center items-center align-middle">
            <img
              alt="Segurança"
              className="z-0 select-none transition-opacity duration-300 md:ml-20 w-full h-auto mx-auto md:h-[21rem] my-auto"
              src={Seguranca}
              style={{ opacity: imagemCarregada ? "1" : "0" }}
              onLoad={() => {
                setImagemCarregada(true);
              }}
            />
          </div>
        </section>

        <section className="md:flex block w-4/5 mx-auto">
          <div className="md:w-4/5 w-full my-auto mx-auto md:ml-20">
            <h1 className="md:text-4xl text-2xl font-semibold font-sans text-gray-900 md:text-left text-center w-full">
              Denúncias anônimas
            </h1>
            <h2 className="md:text-2xl text-base md:text-left text-center font-sans mt-2 font-normal text-gray-500">
              Todas as denúncias são feitas anonimamente à escola selecionada, a
              fim de manter a integridade e o sigilo dos alunos que realizaram a
              reclamação. O anonimato encoraja uma participação mais aberta dos
              estudantes e garante que não haja retaliação.
            </h2>
          </div>
          <div className="w-full h-full py-9 select-none text-center items-center align-middle">
            <img
              alt="Funcionamento"
              className="z-0 select-none transition-opacity duration-300 md:ml-20 w-full h-auto mx-auto md:h-[21rem] my-auto"
              src={Anonimo}
              style={{ opacity: imagemCarregada ? "1" : "0" }}
              onLoad={() => {
                setImagemCarregada(true);
              }}
            />
          </div>
        </section>
      </main>
      {/* Painel mobile */}
      <MobileNav />

      <footer className="bottom-1 text-center w-full">
        <a
          className="text-center w-full text-gray-500 font-medium font-sans"
          href="https://br.freepik.com/vetores-gratis/alunos-aprendendo-lingua-estrangeira-com-vocabulario_11235885.htm"
        >
          Imagens de pch.vector no Freepik e{" "}
        </a>
        <a
          className="text-center w-full text-gray-500 font-medium font-sans"
          href="https://undraw.co/"
        >
          Undraw.com
        </a>
      </footer>
    </div>
  );
}
