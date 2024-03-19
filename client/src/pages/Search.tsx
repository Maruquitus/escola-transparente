import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Header } from "../components/Header";
import { Escola } from "../interfaces";
import { formatar } from "../functions";
import Erro404 from "./404";
import SVG from "../assets/search.svg";
import { MobileNav } from "../components/MobileNav";
import React from "react";

export default function Search() {
  const [escolas, setEscolas] = React.useState<Escola[]>([]);
  React.useEffect(() => {
    fetch("http://localhost:3001/api").then(async (res: Response) => {
      const data: Escola[] = await res.json();
      setEscolas(data);
    });
  }, []);
  return (
    <div className="w-full h-full flex-col flex">
      <div className="md:block hidden">
            <Erro404/>
      </div>
      <div className="md:hidden block">
        <Header/>
        <main>
          <ReactSearchAutocomplete
            styling={{ fontFamily: "Poppins" }}
            placeholder="Procure uma escola..."
            showNoResultsText={escolas.length > 0 ? "Escola não encontrada." : "Carregando..."}
            className="self-center mt-5 w-11/12 md:mt-0 bottom-0.5 mx-auto"
            items={escolas}
            fuseOptions={{ keys: ["nome"] }}
            onSelect={() => {}}
            onSearch={() => {}}
            formatResult={formatar}
          />
          <img alt='' className="w-9/12 mt-12 mx-auto" src={SVG} />
        </main>
      </div>
      <MobileNav/>
    </div>
  );
}
