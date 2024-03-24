import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Header } from "../components/Header";
import { Escola } from "../interfaces";
import { formatar } from "../functions";
import Erro404 from "./404";
import SVG from "../assets/pesquisa.svg";
import { MobileNav } from "../components/MobileNav";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function Pesquisa() {
  const escolas: Escola[] = useLoaderData() as Escola[];
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex-col flex text-center">
      <div className="md:block hidden">
            <Erro404/>
      </div>
      <div className="md:hidden block">
        <Header/>
        <main>
          <ReactSearchAutocomplete
            styling={{ fontFamily: "Poppins", zIndex: 50 }}
            placeholder="Procure uma escola..."
            showNoResultsText={(escolas && escolas.length > 0) ? "Escola não encontrada." : "Carregando..."}
            className="self-center mt-5 w-11/12 md:mt-0 bottom-0.5 mx-auto"
            items={escolas}
            fuseOptions={{ keys: ["nome"] }}
            onSelect={(result) => {navigate('/escola', {state: {escola: result}})}}
            onSearch={() => {}}
            formatResult={formatar}
          />
            {!imagemCarregada && (
            <Skeleton
              width={"80%"}
              borderRadius={20}
              containerClassName="flex-1"
              className="mx-auto aspect-[1] sm:block hidden mt-10 relative w-20"
            />
          )}
          <img alt='' onLoad={() => {setImagemCarregada(true)}} style={{ opacity: imagemCarregada ? '1' : '0', position: imagemCarregada ? 'relative' : 'absolute'}} className="w-9/12 mt-12 mx-auto" src={SVG} />
        </main> 
      </div>
      <MobileNav/>
    </div>
  );
}
