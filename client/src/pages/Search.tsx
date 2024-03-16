import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";
import { Escola } from "../interfaces";
import { formatar } from "../functions";
import Erro404 from "./404";
import SVG from "../assets/search.svg";
import { MobileNav } from "../components/MobileNav";

export default function Search() {
  const state = useLocation().state;
  const escolas: Escola[] = state.escolas;
  if (!state) {
    return <div></div>;
  }
  return (
    <div className="w-full h-full flex-col flex">
      <div className="md:block hidden">
            <Erro404/>
      </div>
      <div className="md:hidden block">
        <Header escolas={escolas} />
        <main>
          <ReactSearchAutocomplete
            styling={{ fontFamily: "Poppins" }}
            placeholder="Procure uma escola..."
            showNoResultsText="Escola não encontrada."
            className="self-center mt-5 w-11/12 md:mt-0 bottom-0.5 mx-auto"
            items={escolas}
            fuseOptions={{ keys: ["nome"] }}
            onSelect={() => {}}
            onSearch={() => {}}
            formatResult={formatar}
          />
          <img className="w-9/12 mt-12 mx-auto" src={SVG} />
        </main>
      </div>
      <MobileNav escolas={escolas}/>
    </div>
  );
}
