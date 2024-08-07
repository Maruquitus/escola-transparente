import { Header } from "../components/Header";
import { MobileNav } from "../components/MobileNav";
import SVG from "../assets/registro.svg";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import { useNavigate, useLocation, useLoaderData } from "react-router-dom";

export default function Cadastro() {
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const [senhaVisível, setSenhaVisível] = useState(false);
  const navigate = useNavigate();
  const [erro, setErro] = useState<null | string>();
  const location = useLocation();
  const logado = (useLoaderData() as Array<2>)[0];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setErro(searchParams.get("erro"));
  }, [location.search]);

  useEffect(() => {
    if (logado) {
      navigate("/home");
    }
  }, [logado, navigate]);

  return (
    <div>
      <Header />
      <main className="flex text-center">
        <div className="w-full sm:w-2/5 my-auto text-left">
          <div className="self-center p-4 grid mx-auto mt-20 sm:ml-8">
            <h1 className="text-slate-900 font-sans font-bold text-3xl text-center">
              Seja bem vindo! Insira suas informações.
            </h1>
            <form className="space-y-3" method="POST" action="/api/novoUsuario">
              <div className="w-full row grid">
                <label className="text-gray-500 text-lg font-sans font-medium">
                  Usuário
                </label>
                <input
                  required
                  name="username"
                  id="usuário"
                  className="text-black font-sans h-10 bg-slate-100 shadow-sm rounded-md outline-0 font-medium p-3"
                  type="text"
                />
              </div>
              <div className="w-full row grid">
                <label className="text-gray-500 text-lg font-sans font-medium">
                  Senha
                </label>
                <input
                  required
                  name="password"
                  id="senha"
                  className="text-black font-sans h-10 bg-slate-100 shadow-sm rounded-md outline-0 font-medium p-3"
                  type={senhaVisível ? "text" : "password"}
                />
              </div>
              <div className="w-full row grid">
                <label className="text-gray-500 text-lg font-sans font-medium">
                  Confirme sua senha
                </label>
                <input
                  required
                  name="confirmPassword"
                  id="senha"
                  className="text-black font-sans h-10 bg-slate-100 shadow-sm rounded-md outline-0 font-medium p-1"
                  type={senhaVisível ? "text" : "password"}
                />
              </div>
              <div className="flex-row">
                <input
                  onClick={() => {
                    setSenhaVisível(!senhaVisível);
                  }}
                  type="checkbox"
                />
                <label className="text-gray-500 text-lg font-sans font-medium ml-1">
                  Mostrar senha
                </label>
              </div>
              <div className="flex justify-center">
                <button
                  id="botão"
                  className="bg-blue-500 text-lg text-white font-sans w-48 h-9 self-center mx-auto rounded-xl font-bold hover:scale-105 hover:bg-[#488cf9] ease-in-out duration-300"
                >
                  Registrar
                </button>
              </div>
            </form>
            <span className="text-red-500 text-center font-sans font-medium">
              {erro}
            </span>
          </div>
        </div>
        {!imagemCarregada && (
          <Skeleton
            width={"80%"}
            borderRadius={20}
            containerClassName="flex-1"
            className="mx-auto aspect-[1.80] sm:block hidden mt-20 relative w-20"
          />
        )}
        <img
          alt=""
          style={{
            opacity: imagemCarregada ? "1" : "0",
            position: imagemCarregada ? "relative" : "absolute",
          }}
          className="w-4/12 sm:block hidden mx-auto mt-16 transition-opacity duration-300"
          src={SVG}
          onLoad={() => {
            setImagemCarregada(true);
          }}
        />
      </main>
      <MobileNav />
    </div>
  );
}
