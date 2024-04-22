import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import SVG from "../assets/taken.svg";
import { FC } from "react";
const Erro404: FC<{}> = () => {
  return (
    <div className="w-full h-full flex-col flex">
      <Header />
      <div className="">
        <img
          alt=""
          className="w-7/12 sm:w-5/12 md:w-4/12 lg:w-3/12 mt-12 mx-auto"
          src={SVG}
        />
        <h1 className="text-center text-gray-800 font-semibold mt-2 font-sans scale-75 sm:scale-90 md:scale-100 text-2xl">
          Ops! Não encontramos a página que você estava procurando!
        </h1>
        <h1 className="text-center text-gray-600 font-medium mt-0 md:mt-2 font-sans scale-75 sm:scale-90 md:scale-100 text-xl">
          Clique{" "}
          <Link
            reloadDocument={true}
            className="text-blue-500 font-sans font-semibold hover:scale-105 duration-150"
            to="/"
          >
            aqui
          </Link>{" "}
          para voltar ao início
        </h1>
      </div>
    </div>
  );
};

export default Erro404;
