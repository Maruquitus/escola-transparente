import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Header } from "../components/Header";
import { Escola, Item } from "../interfaces";
import { procurarEscola, converterEscolas } from "../functions";
import SVG from "../assets/pesquisa.svg";
import { MobileNav } from "../components/MobileNav";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";

export default function Pesquisa() {
  const escolas: Escola[] = useLoaderData() as Escola[];
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        navigate("/");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);
  if (!escolas) return <div></div>;
  const items = converterEscolas(escolas);

  return (
    <div className="w-full h-full flex-col flex text-center">
      <div className="lg:hidden block">
        <Header escolas={escolas}/>
        <main>
          <ReactSearchAutocomplete
            styling={{ fontFamily: "Poppins", zIndex: 50 }}
            placeholder="Procure uma escola..."
            showNoResultsText={
              items.length > 0 ? "Escola não encontrada." : "Carregando..."
            }
            className="self-center mt-10 w-11/12 lg:mt-0 bottom-0.5 mx-auto"
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
          {!imagemCarregada && (
            <Skeleton
              width={"80%"}
              borderRadius={20}
              containerClassName="flex-1"
              className="mx-auto aspect-[1] sm:block hidden mt-10 relative w-20"
            />
          )}
          <img
            alt=""
            onLoad={() => {
              setImagemCarregada(true);
            }}
            style={{
              opacity: imagemCarregada ? "1" : "0",
              position: imagemCarregada ? "relative" : "absolute",
            }}
            className="w-9/12 mt-12 mx-auto duration-300 transition-opacity"
            src={SVG}
          />
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
