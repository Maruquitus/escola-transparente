import { Header } from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { formatarNome, formatarNumeroTelefone } from "../functions";
import { useState } from "react";

export default function PáginaEscola() {
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const {state} = useLocation();
  const navigate = useNavigate();
  if (state === null) {
    navigate('//');
    return (
    <div></div>
    );
  }
  const escola = state.escola;

  return (
    <div className="w-full h-full flex-col flex">
      <Header/>
      <main className="block h-full w-full">
      <div className="bg-gray-200 rounded-2xl py-16 mx-auto w-10/12 h-80 mt-4">
          <img onLoad={() => {setImagemCarregada(true)}} className={"mx-auto sm:scale-100 scale-75 transition-opacity duration-300 " + (imagemCarregada ? "opacity-1" : "opacity-0")} src='escola.png'/>
      </div>
      <h1 className="text-left w-4/5 mx-auto font-sans font-semibold text-2xl mt-3">{formatarNome(escola.nome)}</h1>
      <h2 className="text-left w-4/5 mx-auto font-sans font-medium text-xl">{formatarNome(escola.endereco)}</h2>
      <h2 className="text-left w-4/5 mx-auto font-sans font-medium text-xl">{formatarNumeroTelefone(escola.telefone)}</h2>
      
      <h1 className="text-left w-4/5 mx-auto font-sans font-semibold text-2xl mt-3">Avaliações</h1>
      <div className="w-4/5 mx-auto bg-gray-100 h-40 mt-3">

      </div>
      </main>
    </div>
  );
}